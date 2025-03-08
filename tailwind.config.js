/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Custom blue
        secondary: "#9333EA", // Custom purple
        accent: "#F59E0B", // Custom orange
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        18: "4.5rem", 
        22: "5.5rem",
        100: "25rem",
      },
      borderRadius: {
        xl: "1.5rem",
        "2xl": "2rem",
      },
    },
  },
  darkMode: "class", // Enables dark mode (manual toggle)
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

