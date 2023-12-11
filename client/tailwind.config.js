/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'georama': ['Georama','sans-serif'],
      'saira':['Saira', 'sans-serif'],
      'nunito':['Nunito Sans', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}