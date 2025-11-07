import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            HUMANYX AI
          </h1>
          
          <div className="space-y-2">
            <p className="text-xl text-muted-foreground">
              Coming Soon
            </p>
            <p className="text-sm text-muted-foreground">
              We're working on something special. Enter the password to preview.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center text-lg h-12"
              autoFocus
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-base"
            disabled={!password}
          >
            Access Site
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
          This is a temporary password gate for development purposes.
        </p>
      </div>
    </div>
  );
}
