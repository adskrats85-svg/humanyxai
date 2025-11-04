import { Button } from "@/components/ui/button";
import heroSymbol from "@/assets/hero-symbol.png";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/30 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold glow-text tracking-tight">HUMANYX</div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#vision" className="hover:text-primary transition-colors">Vision</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <Button variant="hero" size="sm">
            Get Started
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
                Next-Generation Intelligence
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in glow-text">
              Humanity,
              <br />
              <span className="text-primary">Redefined.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
              Where biology meets intelligence. Where evolution becomes intentional.
              Experience the convergence of human potential and artificial transcendence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay">
              <Button variant="hero" size="xl" className="group">
                Begin Your Evolution
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="xl">
                Explore the Vision
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

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 glow-text-accent">
              The Evolution of Intelligence
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-16">
              HUMANYX represents the next chapter in human development—a synthesis of organic consciousness 
              and computational precision. We're not replacing humanity; we're amplifying it.
            </p>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Transcendent",
                  description: "Push beyond biological limitations through intelligent augmentation"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Ethical",
                  description: "Human values at the core of every algorithmic decision"
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Evolutionary",
                  description: "Continuous adaptation and growth beyond current horizons"
                }
              ].map((value, i) => (
                <div 
                  key={i}
                  className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border/30 glow-card hover:glow-border transition-all duration-300 group"
                >
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 glow-text">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 relative bg-gradient-to-b from-transparent via-card/20 to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              A New <span className="text-primary glow-text">Paradigm</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              We stand at the precipice of a transformation that will redefine what it means to be human. 
              HUMANYX is the bridge between what we are and what we can become—a platform for conscious evolution, 
              where intelligence enhances intuition, where data illuminates destiny.
            </p>
            <div className="inline-block p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/30 glow-card">
              <blockquote className="text-2xl font-light italic glow-text">
                "The future belongs to those who merge with it."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text">
              Ready to Evolve?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the pioneers shaping the next phase of human evolution. 
              The transformation begins with a single step.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button variant="hero" size="xl" className="group">
                Request Early Access
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-outline" size="xl">
                Learn More
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
              © 2025 HUMANYX. Humanity, Redefined.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
