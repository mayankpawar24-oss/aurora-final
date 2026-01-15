import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1600px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
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
        // AURORA custom colors
        aurora: {
          charcoal: "hsl(var(--aurora-charcoal))",
          slate: "hsl(var(--aurora-slate))",
          steel: "hsl(var(--aurora-steel))",
          forest: "hsl(var(--aurora-forest))",
          olive: "hsl(var(--aurora-olive))",
          "burnt-orange": "hsl(var(--aurora-burnt-orange))",
          rust: "hsl(var(--aurora-rust))",
          sandstone: "hsl(var(--aurora-sandstone))",
          "warm-gray": "hsl(var(--aurora-warm-gray))",
        },
        // Functional colors
        legal: "hsl(var(--legal-boundary))",
        nogozone: "hsl(var(--no-go-zone))",
        excavation: "hsl(var(--excavation-area))",
        status: {
          active: "hsl(var(--status-active))",
          warning: "hsl(var(--status-warning))",
          alert: "hsl(var(--status-alert))",
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
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scan-line": "scan-line 4s linear infinite",
      },
      boxShadow: {
        "panel": "0 2px 8px -2px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03)",
        "panel-lg": "0 4px 16px -4px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.03)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
