/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        purple: '#3f3cbb',
        midnight: '#121063',
        metal: '#565584',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        'bubble-gum': '#ff77e9',
        bermuda: '#78dcca',
        'pastel-green': {
          DEFAULT: '#56EB59',
          50: '#FAFEFB',
          100: '#E8FCE9',
          200: '#C4F8C5',
          300: '#9FF4A1',
          400: '#7BEF7D',
          500: '#56EB59',
          600: '#24E527',
          700: '#16BB19',
          800: '#108912',
          900: '#0A570B'
        },
        lavender: {
          DEFAULT: '#B58AE0',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F2EBFA',
          300: '#DECBF1',
          400: '#C9AAE9',
          500: '#B58AE0',
          600: '#995ED4',
          700: '#7D34C5',
          800: '#612999',
          900: '#451D6D'
        },
        sky: {
          DEFAULT: '#8DBEDD',
          50: '#D4E9F2',
          100: '#CCE4F0',
          200: '#BCDBEB',
          300: '#ADD2E6',
          400: '#9DC8E2',
          500: '#8DBEDD',
          600: '#66A6D1',
          700: '#3F8EC6',
          800: '#3071A1',
          900: '#24547A'
        },
        desert: {
          DEFAULT: '#C7BE8A',
          50: '#DDD8B8',
          100: '#DBD5B3',
          200: '#D6CFA9',
          300: '#D1C99F',
          400: '#CCC394',
          500: '#C7BE8A',
          600: '#B8AC6B',
          700: '#A59850',
          800: '#867C41',
          900: '#675F32'
        },
        city: {
          DEFAULT: '#ACA8A5',
          50: '#CDCBC9',
          100: '#C9C7C5',
          200: '#C2BFBD',
          300: '#BAB7B5',
          400: '#B3B0AD',
          500: '#ACA8A5',
          600: '#96918D',
          700: '#7F7A76',
          800: '#67635F',
          900: '#504C49'
        },
        gray: {
          DEFAULT: '#919191',
          50: '#EDEDED',
          100: '#E3E3E3',
          200: '#CFCFCF',
          300: '#BABABA',
          400: '#A6A6A6',
          500: '#919191',
          600: '#757575',
          700: '#595959',
          800: '#3D3D3D',
          900: '#212121'
        },
        'royal-blue': {
          DEFAULT: '#5663EB',
          50: '#FAFBFE',
          100: '#E8EAFC',
          200: '#C4C8F8',
          300: '#9FA6F4',
          400: '#7B84EF',
          500: '#5663EB',
          600: '#2434E5',
          700: '#1624BB',
          800: '#101A89',
          900: '#0A1157'
        },
        'sahara-sand': {
          DEFAULT: '#F0E77F',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FDFCED',
          300: '#F9F5C8',
          400: '#F4EEA4',
          500: '#F0E77F',
          600: '#EADD4D',
          700: '#E4D31B',
          800: '#B2A515',
          900: '#80760F'
        },
        froly: {
          DEFAULT: '#EF7B7B',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FCE8E8',
          300: '#F8C4C4',
          400: '#F49F9F',
          500: '#EF7B7B',
          600: '#EA4848',
          700: '#E01A1A',
          800: '#AD1414',
          900: '#7B0E0E'
        },
        player: {
          DEFAULT: '#E4D7D7'
        }
      }
    }
  },
  plugins: [require('prettier-plugin-tailwindcss')]
};
