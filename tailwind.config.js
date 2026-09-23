/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.65rem', // Crucial: Enables the tight form text scales used in your Fax layout maps
      }
    },
  },
  plugins: [],
}
