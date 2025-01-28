/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#cbd5e1',
        'primary-dark': '#64748b',
        background: '#131313',
      },
    },
  },
  plugins: [],
};
