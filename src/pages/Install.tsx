import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Check, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Installation Not Available",
        description: "On iPhone: Tap Share → Add to Home Screen. On Android: Use your browser menu to install.",
        duration: 5000,
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      toast({
        title: "Success!",
        description: "HumanyxAI has been installed to your device.",
      });
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Install HumanyxAI
          </h1>
          
          <p className="text-muted-foreground text-lg">
            Get the full app experience on your device. Works offline and loads instantly.
          </p>
        </div>

        {isInstalled ? (
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
              <Check className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-lg font-medium">App Already Installed!</p>
              <p className="text-sm text-muted-foreground mt-2">
                You can access HumanyxAI from your home screen.
              </p>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full"
              size="lg"
            >
              Go to App
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={handleInstallClick}
              className="w-full"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Install App
            </Button>

            <div className="p-4 rounded-lg bg-muted/50 text-left space-y-3">
              <p className="font-medium text-sm">Manual Installation:</p>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>iPhone/iPad:</strong> Tap Share <span className="inline-block">→</span> Add to Home Screen</p>
                <p><strong>Android:</strong> Menu <span className="inline-block">→</span> Install App or Add to Home Screen</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4">
          <h3 className="font-semibold mb-3">Why Install?</h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-left">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Works offline - access your conversations anytime</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Faster loading - optimized performance</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Full-screen experience - no browser UI</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Easy access from your home screen</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
