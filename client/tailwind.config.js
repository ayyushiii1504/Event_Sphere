/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B8860B',
        secondary: '#8B6914',
        accent: '#D4AF37',
        dark: '#1C1C2E',
        charcoal: '#2D2D3A',
        light: '#FAF8F5',
        cream: '#F5F0E8',
        stone: '#E8E0D0',
        muted: '#7A7060',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #B8860B 100%)',
        'dark-gradient': 'linear-gradient(135deg, #1C1C2E 0%, #2D2D3A 100%)',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(184, 134, 11, 0.18)',
        'gold-lg': '0 8px 40px rgba(184, 134, 11, 0.25)',
        'soft': '0 4px 24px rgba(28, 28, 46, 0.08)',
        'soft-lg': '0 12px 48px rgba(28, 28, 46, 0.12)',
      },
    },
  },
  plugins: [],
}
