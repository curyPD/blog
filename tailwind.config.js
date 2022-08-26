/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Merriweather", ...defaultTheme.fontFamily.sans],
        serif: ["Roboto", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
