/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        independencia: "url('/img/independencia.jpg')",
      },
    },
  },
  plugins: [],
};

module.exports = config;
