/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "540px" },
        sm: { min: "541px", max: "767px" },
        md: { min: "768px", max: "900px" },
        lg: { min: "1221px" },
      },
    },
  },
  plugins: [],
};
