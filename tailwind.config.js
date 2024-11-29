const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#003285',
      secondary: '#2a629a',
      tertiary: '#FF7f3e',
      fourth: '#ffda78',
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite', // Customize the duration here
      },
    },
  },
  plugins: [flowbite.plugin()],
};
