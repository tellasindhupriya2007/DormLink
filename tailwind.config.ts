import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "warm-white": "#F9F5F1",
        "brand-coffee": "#2C1810", // The Inception Hero Anchor
        "parchment": "#F4EFE9",
        "crema": "#FDFBF7",
        coffee: {
          50: "#f7f3ef",
          100: "#efe7df",
          200: "#dccfc1",
          300: "#c6b19b",
          400: "#b19577",
          500: "#8b6a4f",
          600: "#70543f",
          700: "#5a4334",
          800: "#3d2d23",
          900: "#2a1f18",
        },
        caramel: "#c8a97e",
        mocha: "#4b3621",
        beige: "#f4efe9",
        "beige-warm": "#f4efe9",
        "peach-soft": "#F4E3D7",
        "gold-soft": "#D4AF37",
        "olive-muted": "#8A8671",
        // Aliases for backward compatibility with the new scale
        "coffee-dark": "#2C1810",  // Now points to brand anchor
        "coffee-light": "#c6b19b", // coffee-300
        "latte-medium": "#dccfc1", // coffee-200
        "latte-light": "#efe7df"   // coffee-100
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
    },
  },
  plugins: [],
};
export default config;
