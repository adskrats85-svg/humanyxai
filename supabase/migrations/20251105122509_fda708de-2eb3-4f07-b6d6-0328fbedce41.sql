-- Fix security: Set search path for can_send_sms function
CREATE OR REPLACE FUNCTION can_send_sms(phone_input TEXT)
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  sms_count_24h INTEGER;
  is_limited BOOLEAN;
BEGIN
  -- Check if manually rate limited
  SELECT is_rate_limited 
  INTO is_limited
  FROM public.signups 
  WHERE phone = phone_input
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If manually rate limited, deny
  IF is_limited = TRUE THEN
    RETURN FALSE;
  END IF;
  
  -- Count SMS sent in last 24 hours
  SELECT COUNT(*) 
  INTO sms_count_24h
  FROM public.sms_logs
  WHERE phone = phone_input
    AND status = 'sent'
    AND created_at >= NOW() - INTERVAL '24 hours';
  
  -- Allow if less than 5 SMS in last 24 hours
  RETURN sms_count_24h < 5;
END;
$$;

-- Fix security: Set search path for trigger_welcome_notification function
CREATE OR REPLACE FUNCTION trigger_welcome_notification()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
  email_request_id bigint;
  sms_request_id bigint;
  can_send_sms_flag BOOLEAN;
BEGIN
  -- Always send email if preference includes it
  IF NEW.contact_preference IN ('email', 'both') THEN
    SELECT extensions.http_post(
      url := 'https://sarjwmqynihhxlnfebmm.supabase.co/functions/v1/send-welcome-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcmp3bXF5bmloaHhsbmZlYm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTgyNjksImV4cCI6MjA3Nzg5NDI2OX0.OKqOHV3CX-dN_I7sgf8KLNsr_3F-s4wI7VJP3vwcI8o'
      ),
      body := jsonb_build_object(
        'email', NEW.email,
        'source', NEW.source
      )
    ) INTO email_request_id;
    
    RAISE LOG 'Welcome email queued for %, request_id: %', NEW.email, email_request_id;
  END IF;

  -- SMS with rate limiting (max 5 per 24 hours)
  IF NEW.contact_preference IN ('sms', 'both') AND NEW.phone IS NOT NULL THEN
    -- Check rate limiting
    can_send_sms_flag := can_send_sms(NEW.phone);
    
    IF can_send_sms_flag THEN
      -- Send SMS
      SELECT extensions.http_post(
        url := 'https://sarjwmqynihhxlnfebmm.supabase.co/functions/v1/send-welcome-sms',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcmp3bXF5bmloaHhsbmZlYm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTgyNjksImV4cCI6MjA3Nzg5NDI2OX0.OKqOHV3CX-dN_I7sgf8KLNsr_3F-s4wI7VJP3vwcI8o'
        ),
        body := jsonb_build_object(
          'phone', NEW.phone,
          'source', NEW.source,
          'signup_id', NEW.id
        )
      ) INTO sms_request_id;
      
      -- Update last SMS sent time and count
      UPDATE public.signups 
      SET 
        last_sms_sent_at = NOW(),
        sms_send_count = COALESCE(sms_send_count, 0) + 1
      WHERE id = NEW.id;
      
      -- Log success
      INSERT INTO public.sms_logs (phone, email, status, reason)
      VALUES (NEW.phone, NEW.email, 'sent', 'Welcome SMS triggered');
      
      RAISE LOG 'Welcome SMS queued for %, request_id: %', NEW.phone, sms_request_id;
    ELSE
      -- Rate limited - log but don't send
      INSERT INTO public.sms_logs (phone, email, status, reason)
      VALUES (NEW.phone, NEW.email, 'rate_limited', 'Max 5 SMS per 24 hours exceeded');
      
      RAISE WARNING 'SMS rate limited for phone %, exceeded 5 SMS per 24h limit', NEW.phone;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;