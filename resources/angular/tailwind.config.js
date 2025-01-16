/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'viser-primary': '#1D2120',
        'viser-secondary': '#F2F4F2',
        'viser-primary-green': '#1C5353',
        'viser-secondary-green': '#3B885E',
        'viser-tertiary-green': '#7ABB55',
        'viser-mint': '#B9E0CD',
        'viser-orange': '#F16722',
        'viser-yellow': '#F3E10E',
      }
    },
  },
  plugins: [],
}
