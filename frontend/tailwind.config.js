/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx', './src/**/*.js'],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite transition-duration: 0.5s',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      colors: {
        current: 'currentColor',
        brown: '#8B5A2B',
        greenForest: '#228B22',
        ground: '#8F9779',
        darkBlue: '#4B0082',
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
