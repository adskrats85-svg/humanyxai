import { Button } from "@/components/ui/button";
import heroSymbol from "@/assets/hero-symbol.png";
import { ArrowRight, Mic, Calendar, Target, Smartphone, MessageCircle, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/30 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold glow-text tracking-tight">HUMANYX</div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#start" className="hover:text-primary transition-colors">Get Started</a>
          </div>
          <Button variant="hero" size="sm">
            Start Free
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Y-X Symbol */}
            <div className="mb-12 flex justify-center animate-fade-in">
              <img 
                src={heroSymbol} 
                alt="Humanyx Symbol" 
                className="w-64 h-64 object-contain animate-glow-pulse"
              />
            </div>

            {/* Tagline */}
            <div className="mb-6 animate-fade-in">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-semibold glow-border">
                Your AI-Powered Personal Development Coach
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in glow-text">
              Transform Your Life,
              <br />
              <span className="text-primary">One Conversation at a Time.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
              Meet your intelligent coaching companion. Available 24/7 through voice, text, or mobile app—ready to guide, support, and hold you accountable on your personal growth journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay">
              <Button variant="hero" size="xl" className="group">
                Start Your Journey Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="xl">
                <Mic className="mr-2 w-5 h-5" />
                Try Voice Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-glow-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 glow-text-accent">
              Your Coach, Your Way
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Humanyx adapts to you—learning your goals, your style, and your rhythm to deliver 
              personalized coaching that fits seamlessly into your life.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            {[
              {
                icon: <Mic className="w-8 h-8" />,
                title: "Voice-First Coaching",
                description: "Have natural conversations with your AI coach anytime. Just speak—your coach listens, understands, and responds."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Custom Development Plans",
                description: "AI-generated roadmaps tailored to your unique goals, strengths, and challenges."
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Smart Accountability",
                description: "Regular check-ins and follow-ups across channels to keep you on track and motivated."
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Everywhere You Are",
                description: "Seamless experience across web, iOS, and Android. Your progress syncs automatically."
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "Multi-Channel Engagement",
                description: "Text, voice, or video—engage however feels natural in the moment."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Adaptive Intelligence",
                description: "Your coach learns from every interaction, continuously refining its approach to you."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border/30 glow-card hover:glow-border transition-all duration-300 group"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 glow-text">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative bg-gradient-to-b from-transparent via-card/20 to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              How <span className="text-primary glow-text">Humanyx</span> Works
            </h2>
            
            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Tell Us About You",
                  description: "Share your goals, challenges, and aspirations through a simple conversation. Your coach learns what matters most to you."
                },
                {
                  step: "02",
                  title: "Get Your Custom Plan",
                  description: "Receive a personalized development roadmap designed specifically for your journey—complete with milestones, exercises, and timelines."
                },
                {
                  step: "03",
                  title: "Engage & Grow",
                  description: "Have ongoing conversations with your coach via voice, text, or app. Ask questions, share wins, work through challenges together."
                },
                {
                  step: "04",
                  title: "Stay Accountable",
                  description: "Regular check-ins keep you on track. Your coach follows up, celebrates progress, and adjusts your plan as you evolve."
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-3xl font-bold text-primary glow-border group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 glow-text">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="start" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text">
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Start your personal development journey today with an AI coach who truly understands you. 
              Your first session is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="hero" size="xl" className="group">
                Meet Your Coach
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="xl">
                <Mic className="mr-2 w-5 h-5" />
                Try Voice Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 backdrop-blur-md bg-card/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold glow-text">HUMANYX</div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 HUMANYX. Your Partner in Personal Growth.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
