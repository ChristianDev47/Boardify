/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: {'min': '0px', 'max': '550px'},
      md: {'min': '550px', 'max': '820px'},
      lg: {'min': '820px', 'max': '1204px'},
      xl: {'min': '1204px', 'max': '1536px'},
      '2xl': {'min': '1536px'}
    },
  },
  plugins: [],
} 