/* eslint-disable @typescript-eslint/no-var-requires */
const { nextui } = require("@nextui-org/react");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        independencia: "url('/img/independencia.jpg')",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          layout: {},
          colors: {
            background: {
              DEFAULT: "#18181b",
            },
          },
        },
      },
    }),
  ],
};

module.exports = config;
