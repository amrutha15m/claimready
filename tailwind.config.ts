import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand — matched to Superleap's green-accent enterprise look
        brand: {
          DEFAULT: "#13A05C",
          dark: "#0B7A43",
          tint: "#E8F6EE",
        },
        ink: "#0E1A15",
        muted: "#5C6B64",
        canvas: "#FFFFFF",
        surface: "#F6F8F7",
        hairline: "#E6EAE8",
        // Readiness status — the product's traffic-light semantics
        ready: "#13A05C",
        atrisk: "#E0A23B",
        blocked: "#DC4C4C",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1120px",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,26,21,0.04), 0 4px 16px rgba(14,26,21,0.04)",
        lift: "0 2px 4px rgba(14,26,21,0.05), 0 12px 32px rgba(14,26,21,0.07)",
      },
    },
  },
  plugins: [],
};
export default config;
