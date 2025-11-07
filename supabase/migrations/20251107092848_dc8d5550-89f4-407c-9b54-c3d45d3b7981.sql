-- Add RLS policy to allow DELETE for whitelisted emails/phones
CREATE POLICY "Allow delete for whitelisted users" ON public.signups
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.test_whitelist
      WHERE test_whitelist.email = signups.email 
         OR test_whitelist.phone = signups.phone
    )
  );