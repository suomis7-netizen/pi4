/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pi: {
          purple: "#7c3aed",
          gold: "#fbbf24",
          dark: "#581c87",
          light: "#a855f7"
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-notification': 'pulse-notification 2s infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};