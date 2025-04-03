import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans], // Ensures Inter is used properly
      },
      spacing: {
        section: "4rem", // Adds consistent section padding
      },
      colors: {
        background: "#f9fafb", // Light gray background
        foreground: "#111827", // Dark foreground
        primary: "#2563eb", // Blue for buttons and links
        "primary-dark": "#1e40af", // Darker shade for hover states
        secondary: "#9333ea", // Purple for accents
        "secondary-dark": "#7e22ce", // Darker secondary shade
        muted: "#64748b", // Soft muted text
      },
      borderRadius: {
        xl: "1rem", // Ensures consistent rounded corners
        "2xl": "1.5rem", // Extra large for softer UI
      },
      boxShadow: {
        soft: "0 4px 6px rgba(0, 0, 0, 0.1)", // Matches your shadow styling
      },
      transitionTimingFunction: {
        "in-out": "ease-in-out", // Ensures smooth transitions
      },
      transitionDuration: {
        300: "300ms", // Ensures consistency with duration-300
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
