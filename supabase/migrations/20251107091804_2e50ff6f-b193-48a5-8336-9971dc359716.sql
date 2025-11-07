-- Create test_whitelist table for testing signups
CREATE TABLE public.test_whitelist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  phone text UNIQUE,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.test_whitelist ENABLE ROW LEVEL SECURITY;

-- Only service role can manage whitelist
CREATE POLICY "Service role can manage whitelist" ON public.test_whitelist
  FOR ALL USING (true);

-- Insert owner's testing details
INSERT INTO public.test_whitelist (email, phone, notes)
VALUES 
  ('Akratiuk85@gmail.com', '+61402724002', 'Owner testing account');

-- Create the missing trigger that calls trigger_welcome_notification
CREATE TRIGGER on_signup_trigger
  AFTER INSERT ON public.signups
  FOR EACH ROW
  EXECUTE FUNCTION trigger_welcome_notification();