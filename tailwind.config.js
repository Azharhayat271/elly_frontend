/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0f1419',
        'secondary': '#536471',
        'border': '#eff3f4',
        'hover': '#f7f9f9',
        'blue': '#1d9bf0',
        'blue-hover': '#1a8cd8',
        'red': '#f4212e',
        'green': '#00ba7c',
      },
    },
  },
  plugins: [],
}
