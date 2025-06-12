/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      spacing: {
        '120': '30rem',
        '110': '27.5rem', 
      },
      borderRadius: { 
        '10px': '10px', 
      },
      /*width: {       
        '345px': '345px', 
      } */
    },
  },
  plugins: [],
};
