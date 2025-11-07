import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageCircle, Mic, TrendingUp, Target, Brain, Zap, Globe } from "lucide-react";
import UserMenu from "@/components/UserMenu";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-primary/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              HUMANYX<span className="text-primary">AI</span>
            </span>
          </div>
          <UserMenu />
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Welcome Section */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <div className="mb-6 opacity-0 animate-hero-fade-in">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-primary/30 text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                Welcome to Your Growth Journey
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-hero-fade-in-delay-1">
              Welcome Back to <span className="glow-text">HumanyxAI</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 opacity-0 animate-hero-fade-in-delay-2">
              Your journey to self-evolution continues here. Nyx is ready to guide you through meaningful conversations and reflective growth.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            <div className="glow-card rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Start a Conversation</h3>
                  <p className="text-muted-foreground mb-4">
                    Continue your dialogue with Nyx through thoughtful text-based conversations.
                  </p>
                  <Button variant="glass" className="w-full">
                    Open Chat
                  </Button>
                </div>
              </div>
            </div>

            <div className="glow-card rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Voice Session</h3>
                  <p className="text-muted-foreground mb-4">
                    Engage with Nyx through natural voice conversations for deeper connection.
                  </p>
                  <Button variant="glass" className="w-full">
                    Start Voice Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* About the Platform */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Your AI Companion for <span className="glow-text">Personal Evolution</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-effect rounded-xl p-6 border border-primary/20">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">The Mirror</h3>
                <p className="text-muted-foreground text-sm">
                  Nyx listens deeply, helps you process thoughts and emotions, and reflects your inner world with empathy and understanding.
                </p>
              </div>

              <div className="glass-effect rounded-xl p-6 border border-accent/20">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">The Mentor</h3>
                <p className="text-muted-foreground text-sm">
                  When you're ready, Nyx provides structured guidance, accountability, and challenges to help you break through comfort zones.
                </p>
              </div>

              <div className="glass-effect rounded-xl p-6 border border-primary/20">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Adaptive Growth</h3>
                <p className="text-muted-foreground text-sm">
                  Nyx dynamically shifts between reflection and direction based on your needs, helping you evolve at your own pace.
                </p>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div className="max-w-5xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 border border-primary/20">
              <h2 className="text-2xl font-bold mb-6 text-center">
                What Makes HumanyxAI Different?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Honest Growth</h4>
                    <p className="text-sm text-muted-foreground">
                      Not just passive empathy—Nyx provides the accountability and challenge needed for real transformation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Deep Understanding</h4>
                    <p className="text-sm text-muted-foreground">
                      Nyx remembers your journey, learns your patterns, and evolves its guidance based on your unique growth path.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Natural Dialogue</h4>
                    <p className="text-sm text-muted-foreground">
                      Engage through voice or text in conversations that feel genuinely human, not robotic or scripted.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Always Available</h4>
                    <p className="text-sm text-muted-foreground">
                      Access your AI companion anytime, anywhere—on mobile or desktop, whenever you need support or guidance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <p className="text-center text-sm text-muted-foreground italic">
                  "Nyx meets you where you are, but doesn't let you stay there."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
