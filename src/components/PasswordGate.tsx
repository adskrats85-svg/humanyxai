import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles, Lock } from 'lucide-react';
import heroStaticBackground from "@/assets/hero-static-background.png";
import heroDuoFigures from "@/assets/hero-duo-figures.png";

interface PasswordGateProps {
  children: React.ReactNode;
}

const SITE_PASSWORD = 'humanyx2025'; // Change this to your preferred password

export function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('site_access') === 'granted';
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === SITE_PASSWORD) {
      localStorage.setItem('site_access', 'granted');
      setIsAuthenticated(true);
      toast.success('Access granted');
    } else {
      toast.error('Incorrect password');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden flex items-center justify-center">
      {/* Static Background Layer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img src={heroStaticBackground} alt="" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
      </div>
      
      {/* Animated Duo Figures Layer */}
      <div className="absolute inset-0 pointer-events-none animate-opacity-breathe-orby">
        <img src={heroDuoFigures} alt="" className="w-full h-full object-contain md:object-cover object-[center_30%]" decoding="async" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 opacity-0 animate-hero-fade-in">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">
              HUMANYX<span className="text-primary">AI</span>
            </span>
          </div>
          
          {/* Lock Badge */}
          <div className="mb-8 opacity-0 animate-hero-fade-in-delay-1">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-primary/30 text-sm font-semibold">
              <Lock className="w-4 h-4 text-primary" />
              Preview Access Required
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-hero-fade-in-delay-2 leading-tight">
            Coming Soon
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed opacity-0 animate-hero-fade-in-delay-3">
            We're building something extraordinary. Enter your access code to preview the future.
          </p>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6 opacity-0 animate-hero-fade-in-delay-4">
            <div className="glass-effect rounded-lg p-6 border border-primary/20">
              <Input
                type="password"
                placeholder="Enter access code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center text-lg h-14 bg-background/50 border-primary/30 focus:border-primary"
                autoFocus
              />
            </div>
            
            <Button 
              type="submit" 
              variant="gradient"
              size="lg"
              className="w-full group"
              disabled={!password}
            >
              <Lock className="w-5 h-5" />
              {!password ? 'Enter Code Above' : 'Unlock Access'}
            </Button>
          </form>

          {/* Trust Badge */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground mt-12 opacity-0 animate-hero-fade-in-delay-5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Development Preview
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Limited Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
