/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'bricolage': ['Bricolage Grotesque','sans-serif'],
      'fira': ['Fira Sans', 'sans-serif'], // Ensure fonts with spaces have " " surrounding it.
      'lato' : ['Lato', 'sans-serif'],
      'merriweather' : ['Merriweather', 'serif'],
      'archivo' : ['Archivo Black', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}