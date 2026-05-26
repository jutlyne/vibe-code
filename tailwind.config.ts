import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#fef3f0',
          100: '#fde3da',
          200: '#fbc4b5',
          300: '#f5a08a',
          400: '#e8765a',
          500: '#d45030',
          600: '#c84b31',
          700: '#a83a24',
        }
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    }
  }
} satisfies Config
