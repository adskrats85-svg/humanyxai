import { Button } from "@/components/ui/button";
import orbyCore from "@/assets/orby-dna.png";
import heroBackground from "@/assets/hero-background.png";
import { Mic, Sparkles, Brain, Globe, Smartphone, MessageCircle, Target, TrendingUp, Zap } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-primary/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              HUMAN<span className="text-primary">Y</span>X
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#orby" className="hover:text-primary transition-colors">Meet Orby</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" size="sm">Log In</Button>
            <Button variant="gradient" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Faint Background Image */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img src={heroBackground} alt="" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Tagline */}
            <div className="mb-8 opacity-0 animate-hero-fade-in">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-primary/30 text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-primary" />
                AI-Powered Personal Development Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 opacity-0 animate-hero-fade-in-delay-1 leading-tight">Humanity, Redefined 

            <br />
              <span className="glow-text">Intelligence</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-hero-fade-in-delay-2">Transform your potential with Orby, your AI life coach. Available 24/7 across web nd mobile—personalized guidance that evolves with you.<span className="text-primary font-semibold">Orby</span>, your AI life coach. 
              Available 24/7 across web and mobile—personalized guidance that evolves with you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 opacity-0 animate-hero-fade-in-delay-3">
              <Button variant="gradient" size="xl" className="group">
                <Zap className="w-5 h-5" />
                Start Your Journey
              </Button>
              <Button variant="glass" size="xl" className="group">
                <Mic className="w-5 h-5" />
                Try Voice Demo
              </Button>
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

      {/* Meet Orby Section */}
      <section id="orby" className="py-32 relative overflow-hidden">
        {/* Faint Background Image */}
        <div className="absolute inset-0 flex items-center justify-center animate-opacity-breathe-orby pointer-events-none">
          <img src={heroBackground} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Meet <span className="glow-text">Orby</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your personal AI coach—a living, breathing intelligence designed to understand, 
                guide, and evolve alongside you on your journey to self-improvement.
              </p>
            </div>

            {/* Orby Visual */}
            <div className="relative max-w-4xl mx-auto mb-20">
              {/* Centered Glowing Orby */}
              <div className="relative flex items-center justify-center py-32">
                <div className="relative">
                  {/* Rotating Background Orby */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={orbyCore} alt="Orby AI Core" className="w-[600px] h-[600px] object-contain animate-spin-slow opacity-30" loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>

            {/* Orby Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[{
              icon: <Brain className="w-8 h-8" />,
              title: "Context-Aware",
              description: "Orby remembers your journey, preferences, and goals to provide deeply personalized guidance."
            }, {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Always Learning",
              description: "Continuously evolving with AI advancements to bring you cutting-edge coaching techniques."
            }, {
              icon: <MessageCircle className="w-8 h-8" />,
              title: "Natural Conversation",
              description: "Engage through voice or text—Orby adapts to your preferred communication style."
            }].map((feature, i) => <div key={i} className="p-8 rounded-2xl glow-card hover:scale-105 transition-all duration-300 group">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative overflow-hidden">
        {/* Faint Background Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img src={heroBackground} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Your Coach, <span className="glow-text-accent">Your Way</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Multimodal access meets personalized intelligence. HumanYX adapts to your life, 
                not the other way around.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{
              icon: <Mic className="w-8 h-8" />,
              title: "Voice-First Coaching",
              description: "Natural conversations with your AI coach. Just speak—Orby listens, understands, and guides you forward."
            }, {
              icon: <Target className="w-8 h-8" />,
              title: "Personalized Plans",
              description: "AI-generated development roadmaps tailored to your unique goals, strengths, and challenges."
            }, {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Smart Accountability",
              description: "Multi-channel check-ins and follow-ups keep you motivated and on track toward your goals."
            }, {
              icon: <Smartphone className="w-8 h-8" />,
              title: "Cross-Platform Sync",
              description: "Seamless experience across web, iOS, and Android. Your progress follows you everywhere."
            }, {
              icon: <Globe className="w-8 h-8" />,
              title: "Available 24/7",
              description: "Your coach is always there when you need guidance, support, or just someone to talk to."
            }, {
              icon: <Brain className="w-8 h-8" />,
              title: "Evolving AI",
              description: "Stay ahead with a platform that grows with AI advancements—you evolve, we evolve."
            }].map((feature, i) => <div key={i} className="p-8 rounded-2xl glow-card hover:scale-105 transition-all duration-300 group">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative overflow-hidden">
        {/* Faint Background Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img src={heroBackground} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Your Journey <span className="glow-text">Simplified</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Four simple steps to unlock your potential with AI-powered coaching
              </p>
            </div>
            
            <div className="space-y-16">
              {[{
              step: "01",
              title: "Share Your Vision",
              description: "Tell Orby about your goals, challenges, and aspirations through natural conversation. Your AI coach learns what drives you."
            }, {
              step: "02",
              title: "Receive Your Plan",
              description: "Get a personalized development roadmap designed specifically for your journey—with milestones, exercises, and timelines."
            }, {
              step: "03",
              title: "Engage Daily",
              description: "Connect with Orby via voice, text, or app. Ask questions, share wins, work through challenges—your coach is always available."
            }, {
              step: "04",
              title: "Evolve Together",
              description: "Regular check-ins keep you accountable. As you grow, Orby adapts—your plan evolves with your changing needs and AI capabilities."
            }].map((item, i) => <div key={i} className="flex flex-col md:flex-row gap-8 items-start group">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl glass-effect flex items-center justify-center text-4xl font-bold glow-text group-hover:scale-110 transition-all duration-300 border border-primary/30">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 pt-4">
                    <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Faint Background Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img src={heroBackground} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text">
              Don't Get Left Behind
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the evolution of personal development. Grow with AI, not apart from it. 
              Your journey to becoming your best self starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="gradient" size="xl" className="group">
                <Zap className="w-5 h-5" />
                Begin Your Evolution
              </Button>
              <Button variant="glass" size="xl">
                <Mic className="w-5 h-5" />
                Try Voice Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 glass-effect">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                HUMAN<span className="text-primary">Y</span>X
              </span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 HUMANYX. Evolve with Intelligence.
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;