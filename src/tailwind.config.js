/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Components/*.vue",
    "./src/Components/Views/*.vue",
    "./src/Components/Preset/*.vue",
    "./src/Pages/*.vue",

    "./src/Colors.html",
    "./src/*.{html, vue, css}"
  ],
  theme: {
    extend: {},
    darkMode: 'class'
  },
  plugins: [],
}

