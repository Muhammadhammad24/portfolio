import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",   // 20px — mobile
        sm:      "1.5rem",    // 24px
        lg:      "2rem",      // 32px
        xl:      "2.5rem",    // 40px — breathing room at 1280px
        "2xl":   "2rem",      // 32px — at 1240px cap
      },
      screens: {
        // One page column. Everything — heading, prose, cards, diagrams —
        // shares these exact edges, so nothing can drift left or right.
        "2xl": "1240px",
      },
    },
    /*
      No colour or radius theme here on purpose. The palette lives in
      globals.css as plain custom properties and is read with var(), which is
      the only place this page defines a colour; the scaffold's shadcn token
      layer was mapped here and used by nothing, so it is gone. What remains
      is the one thing the page genuinely relies on Tailwind for: a single
      centred column that every section shares.
    */
  },
  plugins: [],
} satisfies Config

export default config
