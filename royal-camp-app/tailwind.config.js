/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          dark: "#0F3B70",
        },
        point: {
          blue: "#2A61AC",
          yellow: "#F3D03E",
        },
        bg: {
          light: "#EEF4FA",
          white: "#FFFFFF",
        },
        text: {
          dark: "#333333",
        },
        line: {
          light: "#E0E5EC",
        },
      },
    },
  },
  plugins: [],
};
