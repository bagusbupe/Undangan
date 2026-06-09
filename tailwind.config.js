/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#603416',
        secondary: '#FFC8F3',
        bg: '#FEF0EF',
      },
      fontFamily: {
        nameFont: ['NamaFont', 'serif'],
        nameFont1: ['NamaFont1', 'serif'],
        nameFont2: ['NamaFont2', 'serif'],
      }
    },
  },
  plugins: [],
}
