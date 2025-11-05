-- Make email column nullable to support SMS-only signups
ALTER TABLE public.signups ALTER COLUMN email DROP NOT NULL;

-- Add constraint to ensure at least one contact method is provided
ALTER TABLE public.signups ADD CONSTRAINT at_least_one_contact 
  CHECK (email IS NOT NULL OR phone IS NOT NULL);

-- Clean up test data to allow retesting
DELETE FROM public.signups WHERE email = 'Akratiuk85@gmail.com';
DELETE FROM public.sms_logs WHERE email = 'Akratiuk85@gmail.com';