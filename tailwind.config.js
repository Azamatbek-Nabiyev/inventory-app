/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        regular: ['Regular'],
        medium: ['Medium'],
        semibold: ['Semibold'],
        light: ['Light'],
        montregular: ['MontRegular'],
      },
    },
  },
};
