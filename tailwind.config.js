// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        arrowLoop: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(25px, -25px) rotate(0)", opacity: 0 },
          "51%": { transform: "translate(-25px, 25px) rotate(0)", opacity: 0 },
          "100%": { transform: "translate(0, 0) rotate(0)", opacity: 1 },
        },
      },
      animation: {
        arrowLoop: "arrowLoop 0.7s ease-in-out",
      },
    },
  },
  plugins: [],
};
