const pxToRem = (px) => px / 16 + 'rem';
const basicSpace = Array.from(Array(300)).map((_, index) => pxToRem(index));

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    borderRadius: {
      9: pxToRem(9),
    },
    fontSize: {
      15: pxToRem(15),
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      blue: '#0075FF',
      red: '#F12A2A',
    },
    lineHeight: {
      165: 1.65,
    },
    spacing: {
      ...basicSpace,
    },
    extend: {
      zIndex: {
        60: '60',
        70: '70',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.1s ease-in-out infinite',
      },
      margin: {
        centerCalc: 'calc(-50vw + 50%)',
      },
    },
  },
  plugins: [],
};
