/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins as a custom font
        bh: ['Sour Gummy', 'sans-serif']
      },
      colors: {
        Gld: '#FFD700', // Adding custom color for gold
      }
    },
  },
  plugins: [],
}