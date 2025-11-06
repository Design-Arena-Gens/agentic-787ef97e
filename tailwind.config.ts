import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          50: "#f5f9ff",
          100: "#e0edff",
          200: "#b6d4ff",
          300: "#85b4ff",
          400: "#4c8aff",
          500: "#2563eb",
          600: "#1d4fd7",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#1e3366"
        }
      },
      boxShadow: {
        card: "0 10px 30px rgba(30, 58, 138, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
