/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'bricolage': ['Bricolage Grotesque','sans-serif'],
      'fira':['Fira Sans Condensed', 'sans-serif'],
      'nunito':['Nunito Sans', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}