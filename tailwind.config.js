/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,js}'],
  theme: {
    minWidth: {
      '1/2': '50%',
    },

    extend: {
      fontSize: {
        '11px': '11px',
        '13px': '13px',
        xxs: '0.6rem',
        xxxs: '0.55rem',
      },
    },
  },
  plugins: [],
};
