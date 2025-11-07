-- Remove duplicate trigger that's causing double notifications
DROP TRIGGER IF EXISTS on_signup_trigger ON public.signups;

-- Keep only the on_signup_created trigger (already exists)