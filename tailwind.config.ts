import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-delay": {
          "0%, 40%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 40px hsl(var(--primary) / 0.6))" },
          "50%": { filter: "drop-shadow(0 0 60px hsl(var(--primary) / 0.8))" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-30px)" }
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "hero-fade-in": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(40px) scale(0.95)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)" 
          }
        },
        "hero-fade-in-delay-1": {
          "0%, 20%": { 
            opacity: "0", 
            transform: "translateY(40px) scale(0.95)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)" 
          }
        },
        "hero-fade-in-delay-2": {
          "0%, 35%": { 
            opacity: "0", 
            transform: "translateY(40px) scale(0.95)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)" 
          }
        },
        "hero-fade-in-delay-3": {
          "0%, 50%": { 
            opacity: "0", 
            transform: "translateY(40px) scale(0.95)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)" 
          }
        },
        "hero-fade-in-delay-4": {
          "0%, 65%": { 
            opacity: "0", 
            transform: "translateY(30px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          }
        },
        "opacity-breathe-orby": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" }
        },
        "energy-shake": {
          "0%, 100%": { 
            transform: "translate(0, 0) scale(1)" 
          },
          "10%": { 
            transform: "translate(-2px, 2px) scale(1.01)" 
          },
          "20%": { 
            transform: "translate(2px, -2px) scale(0.99)" 
          },
          "30%": { 
            transform: "translate(-2px, -2px) scale(1.01)" 
          },
          "40%": { 
            transform: "translate(2px, 2px) scale(0.99)" 
          },
          "50%": { 
            transform: "translate(-1px, 1px) scale(1.02)" 
          },
          "60%": { 
            transform: "translate(1px, -1px) scale(0.98)" 
          },
          "70%": { 
            transform: "translate(-1px, -1px) scale(1.01)" 
          },
          "80%": { 
            transform: "translate(1px, 1px) scale(0.99)" 
          },
          "90%": { 
            transform: "translate(-1px, 1px) scale(1)" 
          }
        },
        "scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 1s ease-out forwards",
        "fade-in-delay": "fade-in-delay 1.4s ease-out forwards",
        "slide-in-left": "slide-in-left 1s ease-out forwards",
        "slide-in-right": "slide-in-right 1s ease-out forwards",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "float": "float 8s ease-in-out infinite",
        "spin-slow": "spin-slow 30s linear infinite",
        "scale-in": "scale-in 0.8s ease-out forwards",
        "hero-fade-in": "hero-fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "hero-fade-in-delay-1": "hero-fade-in-delay-1 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "hero-fade-in-delay-2": "hero-fade-in-delay-2 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "hero-fade-in-delay-3": "hero-fade-in-delay-3 2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "hero-fade-in-delay-4": "hero-fade-in-delay-4 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "opacity-breathe-orby": "opacity-breathe-orby 8s ease-in-out infinite",
        "energy-shake": "energy-shake 8s ease-in-out infinite",
        "scroll": "scroll 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
