/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1180px',
        '2xl': '1220px',
      },
    },
  },
  plugins: [],
}