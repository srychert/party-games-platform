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
        palet1: {
          brown: '#8B5A2B',
          greenForest: '#296329',
          ground: '#8F9779',
          purple: '#684780',
          background: '#E9E0D1',
        },
      },
      plugins: [require('prettier-plugin-tailwindcss')],
    },
  },
};
