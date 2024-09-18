/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d6d",
         secondary: "#ff758f",
      },
      fontFamily: {
        'great-vibes': ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

