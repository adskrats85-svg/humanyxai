import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client-fallback";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { z } from 'zod';
import nyxCore from "@/assets/nyx-dna.png";
import heroStaticBackground from "@/assets/hero-static-background.png";
import heroDuoFigures from "@/assets/hero-duo-figures.png";
import meetNyxBackground from "@/assets/meet-nyx-background.png";
import sarahChen from "@/assets/reviews/sarah-chen.jpg";
import marcusJohnson from "@/assets/reviews/marcus-johnson.jpg";
import emilyRodriguez from "@/assets/reviews/emily-rodriguez.jpg";
import davidKim from "@/assets/reviews/david-kim.jpg";
import jessicaPatel from "@/assets/reviews/jessica-patel.jpg";
import alexThompson from "@/assets/reviews/alex-thompson.jpg";
import { Mic, Sparkles, Brain, Globe, Smartphone, MessageCircle, Target, TrendingUp, Zap, Star } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserMenu from "@/components/UserMenu";

// Zod validation schema for signup form
const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, { 
      message: "Phone must be in E.164 format (e.g., +1234567890)" 
    })
    .optional()
    .or(z.literal('')),
  contactPreference: z.enum(['email', 'sms', 'both']),
}).refine(
  (data) => {
    if (data.contactPreference === 'email' || data.contactPreference === 'both') {
      return data.email && data.email.length > 0;
    }
    return true;
  },
  { message: "Email is required for email notifications", path: ['email'] }
).refine(
  (data) => {
    if (data.contactPreference === 'sms' || data.contactPreference === 'both') {
      return data.phone && data.phone.length > 0;
    }
    return true;
  },
  { message: "Phone is required for SMS notifications", path: ['phone'] }
);

const Index = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const navigate = useNavigate();


  // If already authenticated, send to Dashboard
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const [email, setEmail] = useState("");
  const [bottomEmail, setBottomEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bottomPhone, setBottomPhone] = useState("");
  const [contactPreference, setContactPreference] = useState<"email" | "sms" | "both">("email");
  const [bottomContactPreference, setBottomContactPreference] = useState<"email" | "sms" | "both">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = 6;
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Random interval between 3-7 seconds
  const getRandomInterval = () => Math.floor(Math.random() * 4000) + 3000;

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Custom random autoplay logic
  useEffect(() => {
    if (!carouselApi || isPaused) return;

    const scheduleNext = () => {
      autoplayTimerRef.current = setTimeout(() => {
        carouselApi.scrollNext();
        scheduleNext();
      }, getRandomInterval());
    };

    scheduleNext();

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [carouselApi, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleEarlyAccessSubmit = async (e: React.FormEvent, fromLocation: string) => {
    e.preventDefault();
    const rawEmail = fromLocation === "hero" ? email : bottomEmail;
    const rawPhone = fromLocation === "hero" ? phone : bottomPhone;
    const preference = fromLocation === "hero" ? contactPreference : bottomContactPreference;

    // Normalize inputs
    const normalizedEmail = rawEmail ? rawEmail.trim().toLowerCase() : '';
    const normalizedPhone = rawPhone ? rawPhone.trim().replace(/\s+/g, "") : '';

    // Validate with Zod schema
    const validationResult = signupSchema.safeParse({
      email: normalizedEmail,
      phone: normalizedPhone,
      contactPreference: preference,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0];
      toast({
        title: "Validation Error",
        description: firstError || "Please check your input",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Check if email/phone is whitelisted for testing (build OR only for present values)
      const orFilters: string[] = [];
      if (normalizedEmail) orFilters.push(`email.eq.${normalizedEmail}`);
      if (normalizedPhone) orFilters.push(`phone.eq.${normalizedPhone}`);
      let whitelistCheck: any = null;
      if (orFilters.length > 0) {
        const {
          data
        } = await supabase.from('test_whitelist').select('*').or(orFilters.join(',')).maybeSingle();
        whitelistCheck = data;
      }
      if (whitelistCheck) {
        // Whitelisted user - delete any existing signup records first
        let del = supabase.from('signups').delete();
        if (normalizedEmail && normalizedPhone) {
          del = del.or(`email.ilike.${normalizedEmail},phone.eq.${normalizedPhone}`);
        } else if (normalizedEmail) {
          del = del.ilike('email', normalizedEmail);
        } else if (normalizedPhone) {
          del = del.eq('phone', normalizedPhone);
        }
        const {
          error: delError
        } = await del.select('id');
        if (delError) {
          console.warn('Whitelist cleanup failed', delError);
        }
      }

      // Insert new signup with normalized values
      const {
        error
      } = await supabase.from('signups').insert([{
        email: normalizedEmail || null,
        phone: normalizedPhone || null,
        contact_preference: preference,
        source: fromLocation
      }]);
      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already signed up!",
            description: "You're already on our early access list."
          });
          return;
        }
        throw error;
      }

      // Success message without querying internal logs
      toast({
        title: "You're on the list!",
        description: preference === "email" 
          ? `We'll send updates to ${normalizedEmail}` 
          : preference === "sms" 
          ? `We'll send updates to ${normalizedPhone}` 
          : `We'll send updates via email and SMS`
      });
      if (fromLocation === "hero") {
        setEmail("");
        setPhone("");
      } else {
        setBottomEmail("");
        setBottomPhone("");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#nyx" className="hover:text-primary transition-colors">Meet Nyx</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          </div>
          <div className="flex gap-3">
            {user ? (
              <UserMenu />
            ) : (
              <Button variant="gradient" size="sm" onClick={() => navigate('/auth')}>
                Log In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
                Transform Your Life with AI • Join 10,000+ People Evolving Daily
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

            {/* Early Access CTA */}
            <div className="flex flex-col gap-6 justify-center items-center mb-16 opacity-0 animate-hero-fade-in-delay-3">
              {/* Urgency Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/40">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">Limited Spots Available</span>
              </div>

              {/* Contact Preference & Form */}
              <form onSubmit={e => handleEarlyAccessSubmit(e, "hero")} className="flex flex-col gap-4 w-full max-w-md">
                {/* Contact Preference Selector */}
                <div className="glass-effect rounded-lg p-4 border border-primary/20">
                  <Label className="text-sm font-semibold mb-3 block text-center">How would you like to be contacted?</Label>
                  <RadioGroup value={contactPreference} onValueChange={(value: "email" | "sms" | "both") => setContactPreference(value)} className="flex flex-col sm:flex-row gap-3 justify-center">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="hero-email" />
                      <Label htmlFor="hero-email" className="cursor-pointer">Email Only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="hero-sms" />
                      <Label htmlFor="hero-sms" className="cursor-pointer">SMS Only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="hero-both" />
                      <Label htmlFor="hero-both" className="cursor-pointer">Both</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Dynamic Input Fields */}
                <div className="flex flex-col gap-3">
                  {(contactPreference === "email" || contactPreference === "both") && <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="bg-background/50 border-primary/30 focus:border-primary" />}
                  {(contactPreference === "sms" || contactPreference === "both") && <Input type="tel" placeholder="Enter your mobile number" value={phone} onChange={e => setPhone(e.target.value)} className="bg-background/50 border-primary/30 focus:border-primary" />}
                </div>

                <Button variant="gradient" size="lg" type="submit" className="group w-full" disabled={isSubmitting}>
                  <Zap className="w-5 h-5" />
                  {isSubmitting ? "Joining..." : "Request Early Access"}
                </Button>
              </form>

              {/* Voice Demo Button */}
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

      {/* Meet Nyx Section */}
      <section id="nyx" className="py-32 relative overflow-hidden">
        {/* Responsive Background Image */}
        <div className="absolute inset-0 flex items-center justify-center animate-opacity-breathe-orby pointer-events-none">
          <img src={meetNyxBackground} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Meet <span className="glow-text">Nyx</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Artificial Intelligence's nerve centre. Your very own AI companion for emotional, mental, and behavioral growth. A living, breathing intelligence designed to understand, guide, and evolve alongside you on your journey to self-improvement. There is nothing artificial about it!</p>
            </div>

            {/* Nyx Visual */}
            <div className="relative max-w-4xl mx-auto mb-20">
              {/* Centered Glowing Nyx with Human Profiles */}
              <div className="relative flex items-center justify-center py-32 mt-40">
                <div className="relative w-full max-w-2xl">
                  {/* Breathing DNA Orb Background */}
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    {/* Glowing Aura */}
                    <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-orb-aura blur-3xl animate-orb-glow-pulse" />
                    {/* Orb */}
                    <img src={nyxCore} alt="" className="w-[500px] h-[500px] object-contain animate-opacity-breathe-orby animate-energy-shake relative z-10" loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>

            {/* Nyx Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[{
              icon: <Brain className="w-8 h-8" />,
              title: "Context-Aware",
              description: "Nyx remembers your journey, preferences, and goals to provide deeply personalized guidance."
            }, {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Always Learning",
              description: "Continuously evolving with AI advancements to bring you cutting-edge coaching techniques."
            }, {
              icon: <MessageCircle className="w-8 h-8" />,
              title: "Natural Conversation",
              description: "Engage through voice or text—Nyx adapts to your preferred communication style."
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


      {/* Nyx Demo Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              See <span className="glow-text">Nyx</span> in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of AI-powered personal development. Here's how Nyx adapts to your unique journey.
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setCarouselApi}
            className="w-full max-w-5xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CarouselContent>
              {/* Demo Card 1: Goal Setting */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="glass-effect rounded-2xl p-6 border border-primary/20 h-full font-jakarta transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 group cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-110">
                      <Target className="w-5 h-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider transition-colors duration-300">You</div>
                      <div className="text-sm text-foreground/80 leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                        "I want to improve my public speaking skills for work presentations."
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-14">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider transition-colors duration-300">Nyx</div>
                      <div className="text-sm bg-accent/10 rounded-lg p-3 leading-relaxed text-foreground/90 transition-all duration-300 group-hover:bg-accent/15 group-hover:text-foreground">
                        "I'll create a personalized 30-day plan. We'll start with breathing techniques, progress to mirror practice, and build up to recorded presentations. I'll check in weekly to adjust based on your confidence levels."
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/10 transition-colors duration-300 group-hover:border-primary/20">
                    <div className="text-[11px] text-primary font-bold uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.2em]">Adaptive Goal Planning</div>
                  </div>
                </div>
              </CarouselItem>

              {/* Demo Card 2: Emotional Intelligence */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="glass-effect rounded-2xl p-6 border border-primary/20 h-full font-jakarta transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 group cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-110">
                      <Brain className="w-5 h-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider transition-colors duration-300">You</div>
                      <div className="text-sm text-foreground/80 leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                        "I had a tough conversation with my team today. Feeling frustrated."
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-14">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider transition-colors duration-300">Nyx</div>
                      <div className="text-sm bg-accent/10 rounded-lg p-3 leading-relaxed text-foreground/90 transition-all duration-300 group-hover:bg-accent/15 group-hover:text-foreground">
                        "I hear your frustration. Let's unpack this. What specific moment triggered the strongest reaction? Understanding this can help you navigate similar situations better."
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/10 transition-colors duration-300 group-hover:border-primary/20">
                    <div className="text-[11px] text-primary font-bold uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.2em]">Emotional Processing</div>
                  </div>
                </div>
              </CarouselItem>

              {/* Demo Card 3: Progress Tracking */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="glass-effect rounded-2xl p-6 border border-primary/20 h-full font-jakarta transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 group cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-110">
                      <TrendingUp className="w-5 h-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider transition-colors duration-300">You</div>
                      <div className="text-sm text-foreground/80 leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                        "Show me my progress this month."
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-14">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider transition-colors duration-300">Nyx</div>
                      <div className="text-sm bg-accent/10 rounded-lg p-3 leading-relaxed text-foreground/90 transition-all duration-300 group-hover:bg-accent/15 group-hover:text-foreground">
                        "Great momentum! You've completed 12 personal development sessions, maintained an 85% consistency rate, and showed significant improvement in confidence metrics. Your focus areas are evolving nicely."
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/10 transition-colors duration-300 group-hover:border-primary/20">
                    <div className="text-[11px] text-primary font-bold uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.2em]">Intelligent Insights</div>
                  </div>
                </div>
              </CarouselItem>

              {/* Demo Card 4: Personalized Coaching */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="glass-effect rounded-2xl p-6 border border-primary/20 h-full font-jakarta transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 group cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-110">
                      <Sparkles className="w-5 h-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider transition-colors duration-300">You</div>
                      <div className="text-sm text-foreground/80 leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                        "I'm not sure what to focus on next."
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-14">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider transition-colors duration-300">Nyx</div>
                      <div className="text-sm bg-accent/10 rounded-lg p-3 leading-relaxed text-foreground/90 transition-all duration-300 group-hover:bg-accent/15 group-hover:text-foreground">
                        "Based on your recent interactions, I notice you're excelling at time management but struggling with delegation. Let's explore building trust with your team - it aligns perfectly with your leadership goals."
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/10 transition-colors duration-300 group-hover:border-primary/20">
                    <div className="text-[11px] text-primary font-bold uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.2em]">Adaptive Guidance</div>
                  </div>
                </div>
              </CarouselItem>

              {/* Demo Card 5: 24/7 Support */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="glass-effect rounded-2xl p-6 border border-primary/20 h-full font-jakarta transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 group cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-110">
                      <MessageCircle className="w-5 h-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider transition-colors duration-300">You</div>
                      <div className="text-sm text-foreground/80 leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                        "Quick question - best way to start a difficult conversation?"
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-14">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider transition-colors duration-300">Nyx</div>
                      <div className="text-sm bg-accent/10 rounded-lg p-3 leading-relaxed text-foreground/90 transition-all duration-300 group-hover:bg-accent/15 group-hover:text-foreground">
                        "Start with context and empathy: 'I value our working relationship and want to discuss something important.' Then be specific and focus on impact rather than blame. Want to practice together?"
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/10 transition-colors duration-300 group-hover:border-primary/20">
                    <div className="text-[11px] text-primary font-bold uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.2em]">Always Available</div>
                  </div>
                </div>
              </CarouselItem>

              {/* Demo Card 6: Learning Style */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                <div className="glass-effect rounded-2xl p-6 border border-primary/20 h-full font-jakarta transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 group cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary/30 group-hover:scale-110">
                      <Zap className="w-5 h-5 text-primary transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider transition-colors duration-300">You</div>
                      <div className="text-sm text-foreground/80 leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                        "I learn better with real examples."
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 pl-14">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider transition-colors duration-300">Nyx</div>
                      <div className="text-sm bg-accent/10 rounded-lg p-3 leading-relaxed text-foreground/90 transition-all duration-300 group-hover:bg-accent/15 group-hover:text-foreground">
                        "Got it! I've adapted to your learning style. From now on, I'll use case studies and real-world scenarios. For instance, let's look at how Steve Jobs handled difficult product decisions..."
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/10 transition-colors duration-300 group-hover:border-primary/20">
                    <div className="text-[11px] text-primary font-bold uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.2em]">Personalized Learning</div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to experience your own personalized AI companion?
            </p>
            <Button variant="gradient" size="lg" className="group">
              <Sparkles className="w-5 h-5" />
              Get Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative overflow-hidden">
        {/* Responsive Background Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img src={isMobile ? nyxCore : heroStaticBackground} alt="" className={isMobile ? "w-full h-full object-contain animate-float" : "w-full h-full object-contain"} loading="lazy" decoding="async" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Your Coach, <span className="glow-text-accent">Your Way</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Your AI companion for emotional, mental, and behavioral growth.Multimodal access meets personalized intelligence. HumanyxAI adapts to your life, not the other way around.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{
              icon: <Mic className="w-8 h-8" />,
              title: "Voice-First Coaching",
              description: "Natural conversations with your AI coach. Just speak—Nyx listens, understands, and guides you forward."
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
        {/* Responsive Background Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img src={isMobile ? nyxCore : heroStaticBackground} alt="" className={isMobile ? "w-full h-full object-contain animate-float" : "w-full h-full object-contain"} loading="lazy" decoding="async" />
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
              description: "Tell Nyx about your goals, challenges, and aspirations through natural conversation. Your AI coach learns what drives you."
            }, {
              step: "02",
              title: "Receive Your Plan",
              description: "Get a personalized development roadmap designed specifically for your journey—with milestones, exercises, and timelines."
            }, {
              step: "03",
              title: "Engage Daily",
              description: "Connect with Nyx via voice, text, or app. Ask questions, share wins, work through challenges—your coach is always available."
            }, {
              step: "04",
              title: "Evolve Together",
              description: "Regular check-ins keep you accountable. As you grow, Nyx adapts—your plan evolves with your changing needs and AI capabilities."
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

      {/* Reviews Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img src={isMobile ? nyxCore : heroStaticBackground} alt="" className={isMobile ? "w-full h-full object-contain animate-float" : "w-full h-full object-contain"} loading="lazy" decoding="async" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                What People Are <span className="glow-text">Saying</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Join thousands who are already transforming their lives with Nyx
              </p>
              
              {/* Aggregate Rating Summary */}
              <div className="flex flex-col items-center gap-4 max-w-md mx-auto p-6 rounded-2xl glass-effect border border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold glow-text">4.92</div>
                  <div className="flex flex-col items-start">
                    <div className="flex gap-1 mb-1">
                      <Star className="w-6 h-6 fill-primary text-primary" />
                      <Star className="w-6 h-6 fill-primary text-primary" />
                      <Star className="w-6 h-6 fill-primary text-primary" />
                      <Star className="w-6 h-6 fill-primary text-primary" />
                      <Star className="w-6 h-6 fill-primary text-primary opacity-90" />
                    </div>
                    <p className="text-sm text-muted-foreground">Based on 378 ratings</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Chen",
                  role: "Product Manager",
                  rating: 5,
                  avatar: sarahChen,
                  review: "Nyx has completely transformed how I approach personal development. The AI understands my goals and provides incredibly relevant guidance every single day."
                },
                {
                  name: "Marcus Johnson",
                  role: "Entrepreneur",
                  rating: 5,
                  avatar: marcusJohnson,
                  review: "I've tried countless coaching apps, but Nyx is different. It feels like having a real coach who knows me, available 24/7. Game changer for my mental health journey."
                },
                {
                  name: "Emily Rodriguez",
                  role: "Software Engineer",
                  rating: 5,
                  avatar: emilyRodriguez,
                  review: "The voice interface is incredible. I can talk to Nyx during my morning walks, and it feels natural. It's like having a supportive friend who actually helps you grow."
                },
                {
                  name: "David Kim",
                  role: "Creative Director",
                  rating: 5,
                  avatar: davidKim,
                  review: "What impresses me most is how Nyx adapts. As I've evolved over the past months, the guidance has evolved with me. It's truly intelligent."
                },
                {
                  name: "Jessica Patel",
                  role: "Fitness Coach",
                  rating: 5,
                  avatar: jessicaPatel,
                  review: "As someone who coaches others, I was skeptical. But Nyx has helped me work through my own challenges in ways I didn't expect. The accountability features are brilliant."
                },
                {
                  name: "Alex Thompson",
                  role: "Student",
                  rating: 5,
                  avatar: alexThompson,
                  review: "Affordable, accessible, and actually effective. Nyx helped me develop better habits and manage stress during finals. Couldn't have done it without this AI companion."
                }
              ].map((review, i) => (
                <div key={i} className="p-8 rounded-2xl glow-card hover:scale-105 transition-all duration-300 group">
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "{review.review}"
                  </p>
                  
                  {/* Reviewer Info with Avatar */}
                  <div className="flex items-center gap-4 border-t border-border pt-4">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="font-bold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Faint Background Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img src={heroStaticBackground} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-[150px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 glow-text">
              Be Among the First
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the evolution of personal development. Grow with AI, not apart from it. 
              Your journey to becoming your best self starts today.
            </p>

            {/* Urgency Badge */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/40">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">Limited Spots Available</span>
              </div>
            </div>

            {/* Contact Preference & Form */}
            <form onSubmit={e => handleEarlyAccessSubmit(e, "bottom")} className="flex flex-col gap-4 max-w-md mx-auto mb-6">
              {/* Contact Preference Selector */}
              <div className="glass-effect rounded-lg p-4 border border-primary/20">
                <Label className="text-sm font-semibold mb-3 block text-center">How would you like to be contacted?</Label>
                <RadioGroup value={bottomContactPreference} onValueChange={(value: "email" | "sms" | "both") => setBottomContactPreference(value)} className="flex flex-col sm:flex-row gap-3 justify-center">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="bottom-email" />
                    <Label htmlFor="bottom-email" className="cursor-pointer">Email Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="bottom-sms" />
                    <Label htmlFor="bottom-sms" className="cursor-pointer">SMS Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="bottom-both" />
                    <Label htmlFor="bottom-both" className="cursor-pointer">Both</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Dynamic Input Fields */}
              <div className="flex flex-col gap-3">
                {(bottomContactPreference === "email" || bottomContactPreference === "both") && <Input type="email" placeholder="Enter your email" value={bottomEmail} onChange={e => setBottomEmail(e.target.value)} className="bg-background/50 border-primary/30 focus:border-primary" />}
                {(bottomContactPreference === "sms" || bottomContactPreference === "both") && <Input type="tel" placeholder="Enter your mobile number" value={bottomPhone} onChange={e => setBottomPhone(e.target.value)} className="bg-background/50 border-primary/30 focus:border-primary" />}
              </div>

              <Button variant="gradient" size="lg" type="submit" className="group w-full" disabled={isSubmitting}>
                <Zap className="w-5 h-5" />
                {isSubmitting ? "Joining..." : "Request Early Access"}
              </Button>
            </form>

            {/* Voice Demo Button */}
            <Button variant="glass" size="xl">
              <Mic className="w-5 h-5" />
              Try Voice Demo
            </Button>
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
    </div>
  );
};
export default Index;