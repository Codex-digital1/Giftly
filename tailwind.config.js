/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d6d",
        secondary: "#FFF3F5",
      },
      fontFamily: {
        'great-vibes': ['Great Vibes', 'cursive'],
        "playfair-display": ["Playfair Display", "serif"],
        inter: ['Inter', 'system-ui']
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

