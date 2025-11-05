-- First, add the phone and contact_preference columns
ALTER TABLE public.signups 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create enum type for contact preference
DO $$ BEGIN
  CREATE TYPE contact_preference_type AS ENUM ('email', 'sms', 'both');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE public.signups 
ADD COLUMN IF NOT EXISTS contact_preference contact_preference_type DEFAULT 'email';

-- Add constraint to ensure phone is provided if SMS is preferred
ALTER TABLE public.signups
DROP CONSTRAINT IF EXISTS check_phone_for_sms;

ALTER TABLE public.signups
ADD CONSTRAINT check_phone_for_sms 
CHECK (
  (contact_preference = 'email') OR 
  (contact_preference IN ('sms', 'both') AND phone IS NOT NULL)
);

-- Add rate limiting columns
ALTER TABLE public.signups 
ADD COLUMN IF NOT EXISTS last_sms_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS sms_send_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_rate_limited BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS rate_limit_reason TEXT;

-- Create index for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_signups_phone_sms_tracking ON public.signups(phone, last_sms_sent_at) 
WHERE phone IS NOT NULL;

-- Create SMS tracking table for audit trail
CREATE TABLE IF NOT EXISTS public.sms_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  email TEXT,
  status TEXT NOT NULL,
  reason TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on sms_logs
ALTER TABLE public.sms_logs ENABLE ROW LEVEL SECURITY;

-- Only allow service role to read/write
DROP POLICY IF EXISTS "Service role full access" ON public.sms_logs;
CREATE POLICY "Service role full access" ON public.sms_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes on sms_logs
CREATE INDEX IF NOT EXISTS idx_sms_logs_phone ON public.sms_logs(phone, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sms_logs_created_at ON public.sms_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sms_logs_status ON public.sms_logs(status);

-- Function to check if SMS can be sent (max 5 per 24 hours per phone)
CREATE OR REPLACE FUNCTION can_send_sms(phone_input TEXT)
RETURNS BOOLEAN AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_signup_send_welcome ON public.signups;
DROP FUNCTION IF EXISTS trigger_welcome_notification();

-- Create enhanced notification function with rate limiting
CREATE OR REPLACE FUNCTION trigger_welcome_notification()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on signups table
CREATE TRIGGER on_signup_send_welcome
  AFTER INSERT ON public.signups
  FOR EACH ROW
  EXECUTE FUNCTION trigger_welcome_notification();