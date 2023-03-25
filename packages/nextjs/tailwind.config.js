/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        grow: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
        zoom: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.1, 1.1)' },
        },
      },
      animation: {
        grow: 'grow 5s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        zoom: 'zoom 1s ease infinite',
      },
    },
  },
  plugins: [require('rippleui')],
  /** @type {import('rippleui').Config} */
  rippleui: {
    removeThemes: ['dark'],
  },
}
