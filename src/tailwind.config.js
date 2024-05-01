/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/Components/*.vue",
    "./src/Components/Views/*.vue",
    "./src/Components/Preset/*.vue",
    "./src/Pages/*.vue",
    "./index.html",

    "./src/Colors.vue",
    "./src/*.{html, vue, css}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

