/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99ceff',
          300: '#66b6ff',
          400: '#339dff',
          500: '#0085ff',
          600: '#006acc',
          700: '#005099',
          800: '#003566',
          900: '#001b33',
        },
        dental: {
          blue: '#0085ff',
          lightBlue: '#e6f3ff',
          white: '#ffffff',
          gray: '#f5f7fa',
          darkGray: '#4a5568',
        }
      }
    },
  },
  plugins: [],
}
