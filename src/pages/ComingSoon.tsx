import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles, Lock, Calendar, Zap, Brain, MessageCircle, TrendingUp } from 'lucide-react';
import heroStaticBackground from "@/assets/hero-static-background.png";
import heroDuoFigures from "@/assets/hero-duo-figures.png";

const SITE_PASSWORD = 'AK200130!';

export default function ComingSoon() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === SITE_PASSWORD) {
      localStorage.setItem('site_access', 'granted');
      toast.success('Access granted');
      navigate('/');
    } else {
      toast.error('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Static Background Layer */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img src={heroStaticBackground} alt="" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
        </div>
        
        {/* Animated Duo Figures Layer */}
        <div className="absolute inset-0 pointer-events-none animate-opacity-breathe-orby">
          <img src={heroDuoFigures} alt="" className="w-full h-full object-contain md:object-cover object-[center_30%]" decoding="async" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Tagline */}
            <div className="mb-8 opacity-0 animate-hero-fade-in">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-primary/30 text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                Something Extraordinary is Coming
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 opacity-0 animate-hero-fade-in-delay-1 leading-tight">
              Evolution. Redefined.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-hero-fade-in-delay-2">
              Your intelligent companion for the next phase of your life. Converse, reflect and evolve through rich, engaging dialogue.
              <br />
              AI that listens, learns and evolves with you.
            </p>

            {/* Password Access Card */}
            <div className="max-w-md mx-auto mb-16 opacity-0 animate-hero-fade-in-delay-3">
              <div className="glass-effect rounded-2xl p-8 border border-primary/30">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-2">Preview Access</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter your access code to preview the future
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter access code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-center text-lg h-12 bg-background/50 border-primary/30 focus:border-primary"
                    autoFocus
                  />
                  
                  <Button 
                    type="submit" 
                    variant="gradient"
                    className="w-full h-12 text-base"
                    disabled={!password}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Enter Preview
                  </Button>
                </form>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground opacity-0 animate-hero-fade-in-delay-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Available on iOS & Android
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Voice & Text Support
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI-Powered Insights
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Coming Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                What's <span className="glow-text">Coming</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're building the future of human evolution through AI. Here's a glimpse of what awaits.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="glass-effect rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Adaptive Intelligence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nyx learns your patterns, understands your goals, and adapts its approach to match your unique journey. Experience AI that truly knows you.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-effect rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Dual-Tone Dialogue</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From empathetic listening to honest challenges, Nyx balances comfort with accountability. Growth requires both understanding and truth.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-effect rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Evolution Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Watch your growth unfold with intelligent insights, progress tracking, and personalized milestones. See how far you've come.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-24 glass-effect rounded-2xl p-12 border border-primary/20">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-3xl font-bold">Launch Timeline</h3>
              </div>
              
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Beta Preview - Coming Soon</h4>
                    <p className="text-muted-foreground">
                      Limited early access for selected users. Experience the core features of Nyx and help shape the future.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                    <Brain className="w-6 h-6 text-primary/60" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-muted-foreground">Full Launch - Q2 2025</h4>
                    <p className="text-muted-foreground">
                      Complete feature set including voice AI, advanced tracking, and enterprise solutions. The future of personal evolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                HUMANYX<span className="text-primary">AI</span>
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 HUMANYX. Evolve with Intelligence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
