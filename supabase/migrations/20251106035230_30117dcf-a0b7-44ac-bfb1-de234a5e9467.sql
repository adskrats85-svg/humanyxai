-- Fix PUBLIC_DATA_EXPOSURE: Add SELECT policy to signups table
-- Only service role can view signups to protect customer contact data
CREATE POLICY "Only service role can view signups"
  ON public.signups
  FOR SELECT
  USING (false);

-- This policy denies all SELECT access to regular users
-- Only the service_role (used by backend functions and admin tools) can read the data