/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: "Vazirmatn, Vazir, sans-serif",
      },
      colors: {
        milk: "rgba(255, 255, 255, 0.87)",
      },
    },
  },
  plugins: [],
};
