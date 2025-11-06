-- Update trigger_welcome_notification function to include secret header
CREATE OR REPLACE FUNCTION public.trigger_welcome_notification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  email_request_id bigint;
  sms_request_id bigint;
  can_send_sms_flag BOOLEAN;
  internal_secret TEXT;
BEGIN
  -- Get the internal secret from environment
  internal_secret := current_setting('app.settings.edge_function_secret', true);
  
  -- If secret is not set, use a placeholder (will be set via pg_settings or env)
  IF internal_secret IS NULL THEN
    internal_secret := '7f8a9b2c5d6e1f3a4b8c9d0e2f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a';
  END IF;

  -- Always send email if preference includes it
  IF NEW.contact_preference IN ('email', 'both') THEN
    SELECT net.http_post(
      url := 'https://sarjwmqynihhxlnfebmm.supabase.co/functions/v1/send-welcome-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcmp3bXF5bmloaHhsbmZlYm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTgyNjksImV4cCI6MjA3Nzg5NDI2OX0.OKqOHV3CX-dN_I7sgf8KLNsr_3F-s4wI7VJP3vwcI8o',
        'x-internal-secret', internal_secret
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
      SELECT net.http_post(
        url := 'https://sarjwmqynihhxlnfebmm.supabase.co/functions/v1/send-welcome-sms',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcmp3bXF5bmloaHhsbmZlYm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTgyNjksImV4cCI6MjA3Nzg5NDI2OX0.OKqOHV3CX-dN_I7sgf8KLNsr_3F-s4wI7VJP3vwcI8o',
          'x-internal-secret', internal_secret
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
$function$;