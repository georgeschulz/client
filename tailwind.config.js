/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./src/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        primary: "#003506",
        yellowSecondary: "#c2b51e",
        darkGreen: "#001a03",
      }
    },
  },
  plugins: [],
}
