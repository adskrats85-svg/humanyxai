-- Create signups table for early access
CREATE TABLE public.signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for public signup forms)
CREATE POLICY "Allow public inserts" ON public.signups
  FOR INSERT
  WITH CHECK (true);

-- Create indexes for faster lookups
CREATE INDEX idx_signups_email ON public.signups(email);
CREATE INDEX idx_signups_created_at ON public.signups(created_at DESC);