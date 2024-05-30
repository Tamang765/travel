const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0e0e23",
        secondary: "#0e0e23",
        primary: "#FBB02E",
        red: "red",
      },
      fontSize: {
        s: "12px",
      },

      fontFamily: {
        sans: ["Croogla"],
      },
      screens: {
        xl: { max: "1600px" },
        lg: { max: "1400px" },
        tab: { max: "768px" },
        mobile: { max: "512px" },
      },
    },
  },
  plugins: [],
});
