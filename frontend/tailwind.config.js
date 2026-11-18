/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0F2A57",
        cobalt: { DEFAULT: "#1F5FE0", dark: "#174BB8" },
        sky: { DEFAULT: "#EAF2FF", deep: "#D5E5FF" },
        rule: "#D6E2F5",
        muted: "#566B8F",
        danger: { DEFAULT: "#B42318", wash: "#FEF3F2" },
      },
    },
  },
  plugins: [],
};
