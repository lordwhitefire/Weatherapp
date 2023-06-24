/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind')
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {},
  },
  plugins: [
require('@tailwindcss/typography'),
   addDynamicIconSelectors(),
         // Other plugins...
    ],
}





