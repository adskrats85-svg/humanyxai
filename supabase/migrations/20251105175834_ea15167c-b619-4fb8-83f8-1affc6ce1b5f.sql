-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Drop and recreate the trigger function with correct net.http_post syntax
DROP FUNCTION IF EXISTS public.trigger_welcome_notification() CASCADE;

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
BEGIN
  -- Always send email if preference includes it
  IF NEW.contact_preference IN ('email', 'both') THEN
    SELECT net.http_post(
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
      SELECT net.http_post(
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
$function$;

-- Recreate the trigger on signups table
DROP TRIGGER IF EXISTS on_signup_created ON public.signups;
CREATE TRIGGER on_signup_created
  AFTER INSERT ON public.signups
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_welcome_notification();