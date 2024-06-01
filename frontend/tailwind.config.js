/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        'tratop-red': '#FF0000', // Red
        'tratop-white': '#FFFFFF', // White
        'tratop-black': '#000000', // Black
      },
      animation: {
        'word-appear': 'word-appear 1s ease-in-out forwards',
      },
      keyframes: {
        'word-appear': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      backgroundImage: {
        'background':  "url('/bgOne.png')",
        'backgroundOne':  "url('/bg2.png')",
        
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'), // Correct placement
  ],
};