// Centralized access to public environment variables with safe fallbacks
// These fallbacks use publishable/public values only.

export const PUBLIC_ENV = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "https://sarjwmqynihhxlnfebmm.supabase.co",
  SUPABASE_PUBLISHABLE_KEY:
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhcmp3bXF5bmloaHhsbmZlYm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMTgyNjksImV4cCI6MjA3Nzg5NDI2OX0.OKqOHV3CX-dN_I7sgf8KLNsr_3F-s4wI7VJP3vwcI8o",
} as const;
