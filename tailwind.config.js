const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      colors: {
        cyan: {
          400: '#22d3ee',
        },
        blue: {
          light: {
            500: '#0ea5e9'
          }
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
