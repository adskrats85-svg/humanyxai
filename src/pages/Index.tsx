import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import orbyCore from "@/assets/orby-core.png";
import humanProfiles from "@/assets/human-profiles.png";
import { ArrowRight, Mic, Dna, Brain, Zap, Users, Shield, Sparkles, Phone, Target, Link2, Palette, MessageCircle, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground font-['Inter',sans-serif] bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-primary/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">
            HUMANYX
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#vision" className="hover:text-primary transition-colors">Vision</a>
            <a href="#platform" className="hover:text-primary transition-colors">Platform</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
          </div>
          <Button variant="neon" size="sm">
            Join the Evolution
          </Button>
        </div>
      </nav>

      {/* Hero Section - The Next Generation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Layer */}
        <div className="absolute inset-0 opacity-20">
          <img src={heroBackground} alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Energy Grid */}
        <div className="absolute inset-0 energy-grid opacity-30" />
        
        {/* Animated Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[150px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[200px] animate-breathe" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 animate-fade-in leading-none">
              The Next Generation
              <br />
              of Human.
            </h1>

            <p className="text-xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay font-light">
              AI that evolves with you — emotionally, cognitively, and behaviorally.
            </p>

            <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
              Your personal AI coach. Available 24/7 through voice, text, and mobile. 
              Evolve with AI, or be left behind.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delay mb-20">
              <Button variant="neon" size="xl" className="group min-w-[260px]">
                Join the Evolution
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button variant="neon-outline" size="xl" className="min-w-[260px]">
                <Mic className="mr-2 w-5 h-5" />
                Discover Humanyx
              </Button>
            </div>

            {/* Orby - The Central Intelligence */}
            <div className="relative max-w-4xl mx-auto mb-16">
              <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Rotating Orby Background with Enhanced Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative animate-spin-slow">
                    <img 
                      src={orbyCore} 
                      alt="Orby - Your AI Life Coach" 
                      className="w-[500px] h-[500px] object-contain drop-shadow-[0_0_80px_rgba(59,130,246,0.9)] animate-breathe"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40 rounded-full blur-3xl animate-pulse" />
                  </div>
                </div>
                
                {/* Human Profiles Centered */}
                <div className="relative z-10">
                  <img 
                    src={humanProfiles} 
                    alt="Humanity Enhanced" 
                    className="w-[480px] h-auto object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
              
              <div className="text-center mt-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Meet Orby</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your central AI intelligence. A living, breathing life coach providing 
                  context-rich information personalized to you, 24/7.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-primary/20">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Always Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Infinite Potential</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Personalized</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <Sparkles className="w-8 h-8 text-primary animate-breathe" />
        </div>
      </section>

      {/* Our Story Section */}
      <section id="vision" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Visual */}
              <div className="relative">
                <div className="absolute inset-0 electric-gradient rounded-3xl blur-[100px] opacity-30" />
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-primary/30 glow-card">
                  <img 
                    src={heroBackground} 
                    alt="Human Evolution" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 electric-gradient opacity-20 mix-blend-overlay" />
                </div>
              </div>

              {/* Right: Narrative */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-sm font-bold uppercase tracking-wider">
                  <Dna className="w-4 h-4" />
                  Our Philosophy
                </div>

                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  Evolution Isn't About 
                  <br />Replacing Humanity
                </h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    It's about refining it. 
                    We stand at humanity's most pivotal moment — the dawn of cognitive evolution.
                  </p>
                  
                  <p>
                    Humanyx represents the fusion of human potential and adaptive intelligence. 
                    Like the X and Y chromosomes that define us, we create something greater than the sum of our parts.
                  </p>

                  <p>
                    We design intelligence that grows with you, 
                    not beyond you. Your personal AI coach that understands you at a biological, cognitive, and emotional level.
                  </p>
                </div>

                <div className="pt-6">
                  <Button variant="neon-outline" size="lg" className="group">
                    Explore Our Vision
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Architecture Section */}
      <section id="platform" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                The Humanyx Platform
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Three intelligent layers working in harmony to accelerate your evolution
              </p>
            </div>

            {/* Platform Layers */}
            <div className="space-y-12">
              {[
                {
                  icon: <Mic className="w-12 h-12" />,
                  title: "X-Voice",
                  subtitle: "Your AI Mentor",
                  description: "Natural voice conversations with your personal AI coach. Speak freely, be understood completely, receive guidance instantly. Available on web, iOS, and Android.",
                  color: "primary"
                },
                {
                  icon: <Brain className="w-12 h-12" />,
                  title: "X-Core",
                  subtitle: "Intelligence Engine",
                  description: "The behavioral and memory intelligence system that learns your patterns, anticipates your needs, and personalizes your development path. Deep integration with your life.",
                  color: "secondary"
                },
                {
                  icon: <Zap className="w-12 h-12" />,
                  title: "XOS",
                  subtitle: "Evolution Operating System",
                  description: "The continuous evolution engine that orchestrates your growth across all dimensions — physical, mental, emotional, and spiritual. Adaptive, intelligent, alive.",
                  color: "accent"
                }
              ].map((layer, i) => (
                <div key={i} className="relative group">
                  {/* Connection Line */}
                  {i < 2 && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-12 bg-gradient-to-b from-primary to-transparent" />
                  )}
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center p-8 rounded-3xl bg-card/30 backdrop-blur-sm border border-primary/20 glow-card">
                    <div className={`flex-shrink-0 w-24 h-24 rounded-2xl electric-gradient flex items-center justify-center text-white shadow-[0_0_40px_hsl(var(--${layer.color})/0.5)] group-hover:shadow-[0_0_60px_hsl(var(--${layer.color})/0.7)] transition-all duration-300`}>
                      {layer.icon}
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl font-bold mb-2">{layer.title}</h3>
                      <p className="text-lg font-semibold mb-3">{layer.subtitle}</p>
                      <p className="text-muted-foreground leading-relaxed">{layer.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Beyond Traditional Coaching
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Humanyx combines cutting-edge AI with deep personalization to create 
              an evolution experience that's uniquely yours
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <Palette className="w-10 h-10" />,
                title: "Customizable AI Coach",
                description: "Design your perfect coach — male, female, tone, personality traits, communication style. Your evolution, your preferences.",
                color: "primary"
              },
              {
                icon: <Target className="w-10 h-10" />,
                title: "Goal Planning & Tracking",
                description: "Intelligent goal-setting tools with real-time progress tracking. Visualize your transformation across all life dimensions.",
                color: "secondary"
              },
              {
                icon: <Link2 className="w-10 h-10" />,
                title: "Platform Integrations",
                description: "Connect Google Fit, Apple Health, your LLM accounts, and more. Holistic understanding of you and your world.",
                color: "accent"
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "White-Label & B2B",
                description: "Fully customizable layouts, branding, and embedded capabilities. Bring Humanyx evolution to your organization.",
                color: "primary"
              },
              {
                icon: <Phone className="w-10 h-10" />,
                title: "Direct Phone Access",
                description: "Give your coach their own phone number. Enable friends, family, or mentors to leave encouraging messages and feedback.",
                color: "secondary"
              },
              {
                icon: <BookOpen className="w-10 h-10" />,
                title: "Curated Content",
                description: "Access exclusive Humanyx content delivered by world-renowned personal development experts. Personalized learning pathways.",
                color: "accent"
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-card-border glow-card group"
              >
                <div className={`text-${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 energy-grid opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">
              Your Evolution Journey
            </h2>
            
            <div className="space-y-16">
              {[
                {
                  step: "01",
                  icon: <Users className="w-8 h-8" />,
                  title: "Neural Mapping",
                  description: "Share your goals, challenges, and aspirations. Your AI coach creates a comprehensive profile using advanced behavioral analysis and cognitive modeling."
                },
                {
                  step: "02",
                  icon: <Dna className="w-8 h-8" />,
                  title: "Personalized Blueprint",
                  description: "Receive your evolution roadmap — custom development plans built from AI analysis of your unique patterns, complete with milestones and optimized pathways."
                },
                {
                  step: "03",
                  icon: <Mic className="w-8 h-8" />,
                  title: "Active Engagement",
                  description: "Engage naturally through voice, text, or app. Deep conversations, challenge work-throughs, win celebrations — your coach is always available, 24/7."
                },
                {
                  step: "04",
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Continuous Evolution",
                  description: "Real-time adaptation based on your progress, setbacks, and evolving goals. Watch yourself transform as your plan morphs with you. Intelligence that grows."
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl electric-gradient flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_40px_hsl(var(--primary)/0.5)] group-hover:scale-110 group-hover:shadow-[0_0_80px_hsl(var(--primary)/0.7)] transition-all duration-300">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-primary">{item.icon}</div>
                      <h3 className="text-2xl font-bold neon-text">{item.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 electric-gradient opacity-10" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[200px] animate-breathe" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
              Join the Evolution
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              Evolution doesn't wait. Every moment you delay is potential unrealized, 
              growth deferred, a future version of yourself left behind.
            </p>
            
            <p className="text-lg text-foreground/80 mb-12 font-light">
              Your first session is completely free. 
              Experience the future of human potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button variant="neon" size="xl" className="group min-w-[280px]">
                Start Your Evolution Now
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button variant="neon-magenta" size="xl" className="min-w-[280px]">
                <Mic className="mr-2 w-5 h-5" />
                Watch the Vision Film
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-8 border-t border-primary/20">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Free first session</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-accent" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-12 backdrop-blur-xl bg-card/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="text-2xl font-bold">
              HUMANYX
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#vision" className="hover:text-primary transition-colors">Vision</a>
              <a href="#platform" className="hover:text-primary transition-colors">Platform</a>
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground border-t border-primary/10 pt-8">
            <p className="mb-2">
              © 2025 HUMANYX. The Next Generation of Human.
            </p>
            <p className="text-xs opacity-60">
              Evolve with AI, or be left behind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
