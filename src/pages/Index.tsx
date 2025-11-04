import { Button } from "@/components/ui/button";
import chromosomeLogo from "@/assets/chromosome-logo.png";
import heroBackground from "@/assets/hero-background.jpg";
import { ArrowRight, Mic, Dna, Brain, Zap, Users, Shield, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground font-['Inter',sans-serif] bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/50 border-b border-border/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={chromosomeLogo} alt="Humanyx" className="w-8 h-8 animate-glow-pulse" />
            <div className="text-2xl font-bold glow-text tracking-tight">
              HUMAN<span className="text-primary">Y</span><span className="text-secondary">X</span>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#evolution" className="hover:text-primary transition-colors">Evolution</a>
            <a href="#capabilities" className="hover:text-primary transition-colors">Capabilities</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          </div>
          <Button variant="hero" size="sm">
            Begin Evolution
          </Button>
        </div>
      </nav>

      {/* Hero Section - Evolution Statement */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* DNA Background */}
        <div className="absolute inset-0 opacity-30">
          <img src={heroBackground} alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[180px] animate-float" style={{ animationDelay: '6s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Chromosome Logo - Interactive */}
            <div className="mb-12 flex justify-center animate-fade-in">
              <div className="relative group cursor-pointer">
                <img 
                  src={chromosomeLogo} 
                  alt="X-Y Chromosome Evolution" 
                  className="w-72 h-72 object-contain animate-glow-pulse transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-[100px] group-hover:blur-[120px] transition-all duration-700" />
              </div>
            </div>

            {/* Evolution Badge */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold glow-border uppercase tracking-wider">
                <Dna className="w-4 h-4" />
                Digital Evolution is Here
              </span>
            </div>

            {/* Main Headline - Evolution Message */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in leading-tight">
              Evolve With AI,
              <br />
              <span className="evolution-gradient bg-clip-text text-transparent glow-text">
                Or Be Left Behind.
              </span>
            </h1>

            {/* Subheadline - The New Evolution */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay">
              We stand at humanity's most critical junction. Just as our ancestors evolved or perished, 
              today's choice is clear: <span className="text-primary font-semibold">partner with AI to transcend your limits</span>, 
              or watch evolution pass you by.
            </p>

            <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto animate-fade-in-delay font-light">
              <span className="font-semibold text-secondary">Humanyx</span> is your AI-powered evolution partner. 
              Available 24/7 through voice, text, and mobile—guiding you to become the enhanced version of yourself.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delay mb-16">
              <Button variant="evolution" size="xl" className="group min-w-[240px]">
                Begin Your Evolution
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="xl" className="min-w-[240px]">
                <Mic className="mr-2 w-5 h-5" />
                Experience Voice AI
              </Button>
            </div>

            {/* Evolution Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-border/30">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Always Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Growth Potential</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1:1</div>
                <div className="text-sm text-muted-foreground">Personal Coaching</div>
              </div>
            </div>
          </div>
        </div>

        {/* DNA Helix Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <Dna className="w-8 h-8 text-primary animate-glow-pulse" />
        </div>
      </section>

      {/* Evolution Context Section */}
      <section id="evolution" className="py-32 relative dna-pattern">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                The <span className="text-primary glow-text">X</span> and <span className="text-secondary glow-text-secondary">Y</span> of Evolution
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Like the chromosomes that define us, <span className="font-semibold text-primary">Humanyx</span> represents 
                the fusion of human potential (<span className="text-secondary font-semibold">Y</span>) with 
                artificial intelligence (<span className="text-primary font-semibold">X</span>). 
                Together, we create something greater than the sum of our parts.
              </p>
            </div>

            {/* Evolution Timeline */}
            <div className="space-y-16">
              <div className="flex flex-col md:flex-row gap-8 items-center group">
                <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-muted/30 border-2 border-primary/30 flex items-center justify-center glow-card">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-primary">Past: Natural Selection</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    For millennia, evolution happened slowly through natural selection. The strong adapted, the weak fell behind. 
                    Survival depended on biological advantages.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center group">
                <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-muted/30 border-2 border-accent/30 flex items-center justify-center glow-card">
                  <Zap className="w-12 h-12 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-accent">Present: Digital Selection</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Today, evolution accelerates at digital speed. Those who adapt with AI multiply their potential. 
                    Those who resist are left behind—a new form of natural selection.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center group">
                <div className="flex-shrink-0 w-24 h-24 rounded-2xl evolution-gradient flex items-center justify-center glow-card shadow-[0_0_40px_hsl(var(--primary)/0.3)]">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">
                    <span className="evolution-gradient bg-clip-text text-transparent">Future: Enhanced Humanity</span>
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    With Humanyx, you don't just survive—you <span className="text-primary font-semibold">thrive</span>. 
                    AI augments your intelligence, accelerates your growth, and unlocks capabilities you never knew you had.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 glow-text">
              Your Evolution, Amplified
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Humanyx combines cutting-edge AI with deep personal understanding to accelerate 
              your transformation into the person you're meant to become.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <Mic className="w-10 h-10" />,
                title: "Voice-First Intelligence",
                description: "Natural conversations with your AI coach. Speak freely, be understood completely, receive guidance instantly.",
                color: "primary"
              },
              {
                icon: <Brain className="w-10 h-10" />,
                title: "Adaptive Learning",
                description: "Your coach evolves with you—learning your patterns, anticipating your needs, optimizing your path forward.",
                color: "secondary"
              },
              {
                icon: <Dna className="w-10 h-10" />,
                title: "DNA-Level Personalization",
                description: "Custom development plans tailored to your unique psychological profile, goals, and growth trajectory.",
                color: "accent"
              },
              {
                icon: <Zap className="w-10 h-10" />,
                title: "Real-Time Accountability",
                description: "Multi-channel check-ins that keep you on track. Your coach reaches out when you need it most.",
                color: "primary"
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Always Available",
                description: "24/7 access across web, iOS, and Android. Your evolution never sleeps—neither does your coach.",
                color: "secondary"
              },
              {
                icon: <Sparkles className="w-10 h-10" />,
                title: "Continuous Evolution",
                description: "Regular progress tracking and plan optimization. Watch yourself transform in real-time.",
                color: "accent"
              }
            ].map((capability, i) => (
              <div 
                key={i}
                className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border/30 glow-card group"
              >
                <div className={`text-${capability.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {capability.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 glow-text">{capability.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative bg-gradient-to-b from-transparent via-card/20 to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">
              Your Evolution <span className="evolution-gradient bg-clip-text text-transparent">Protocol</span>
            </h2>
            
            <div className="space-y-16">
              {[
                {
                  step: "01",
                  icon: <Users className="w-8 h-8" />,
                  title: "Neural Mapping",
                  description: "Share your goals, challenges, and aspirations. Your AI coach creates a comprehensive profile of who you are and who you want to become."
                },
                {
                  step: "02",
                  icon: <Dna className="w-8 h-8" />,
                  title: "Evolution Blueprint",
                  description: "Receive your personalized growth roadmap—built from AI analysis of your unique patterns, complete with milestones and optimized pathways."
                },
                {
                  step: "03",
                  icon: <Mic className="w-8 h-8" />,
                  title: "Active Engagement",
                  description: "Engage naturally through voice, text, or app. Have deep conversations, work through challenges, celebrate wins—your coach is always there."
                },
                {
                  step: "04",
                  icon: <Zap className="w-8 h-8" />,
                  title: "Adaptive Acceleration",
                  description: "Your coach adjusts in real-time based on your progress, setbacks, and evolving goals. The plan morphs as you transform."
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-8 items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl evolution-gradient flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_40px_hsl(var(--primary)/0.3)] group-hover:scale-110 group-hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)] transition-all duration-300">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-primary">{item.icon}</div>
                      <h3 className="text-2xl font-bold glow-text">{item.title}</h3>
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
        <div className="absolute inset-0 evolution-gradient opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img 
                src={chromosomeLogo} 
                alt="Evolution" 
                className="w-32 h-32 mx-auto animate-glow-pulse"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text">
              The Choice is Yours
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              Evolution doesn't wait. Every moment you delay is potential unrealized, 
              growth deferred, a future version of yourself left behind.
            </p>
            <p className="text-lg text-foreground/80 mb-12 font-light">
              Your first session is <span className="text-primary font-bold">completely free</span>. 
              Experience the future of human potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="evolution" size="xl" className="group min-w-[280px]">
                Start Your Evolution Now
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button variant="dna" size="xl" className="min-w-[280px]">
                <Mic className="mr-2 w-5 h-5" />
                Try Voice Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 backdrop-blur-xl bg-card/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img src={chromosomeLogo} alt="Humanyx" className="w-8 h-8" />
              <div className="text-2xl font-bold glow-text">
                HUMAN<span className="text-primary">Y</span><span className="text-secondary">X</span>
              </div>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 HUMANYX. <span className="text-primary">Evolve or be left behind.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
