/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f5f0e8',
          dark: '#ece7dd',
          darker: '#ddd7cc',
        },
        indigo: {
          DEFAULT: '#1a1a2e',
          light: '#2a2a4a',
          lighter: '#3a3a5a',
        },
        vermillion: {
          DEFAULT: '#c0392b',
          light: '#e74c3c',
          dark: '#962d22',
        },
        ochre: {
          DEFAULT: '#c8a951',
          light: '#d4bc6a',
        },
        ink: '#1a1a1a',
        stone: {
          DEFAULT: '#6b6b6b',
          light: '#d4cfc6',
          lighter: '#e8e3da',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
