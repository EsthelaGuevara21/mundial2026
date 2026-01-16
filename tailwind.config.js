/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Lexend', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
      colors: {
        primary: '#14B8A6',
        background: {
          light: '#f8fafc',
          dark: '#0a0f14',
        },
        card: {
          dark: '#111827',
        },
        border: {
          dark: '#1e293b',
        },
      },
    },
  },
  plugins: [],
}
