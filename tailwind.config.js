/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          os: {
            bg: '#0b0d10',
            dark: '#1a1a1a',
            panel: '#151A21',
            border: 'rgba(255,255,255,0.08)',
          },
        },
        fontFamily: {
          sans: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }