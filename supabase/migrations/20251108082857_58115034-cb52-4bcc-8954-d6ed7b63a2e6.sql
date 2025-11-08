-- Create newsletter signups table
CREATE TABLE public.newsletter_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'coming-soon',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT
);

-- Create index for email lookups
CREATE INDEX idx_newsletter_email ON public.newsletter_signups(email);

-- Enable Row Level Security
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can sign up for newsletter)
CREATE POLICY "Allow public newsletter signups" 
ON public.newsletter_signups 
FOR INSERT 
WITH CHECK (true);

-- Only service role can view newsletter signups
CREATE POLICY "Only service role can view newsletter signups" 
ON public.newsletter_signups 
FOR SELECT 
USING (false);