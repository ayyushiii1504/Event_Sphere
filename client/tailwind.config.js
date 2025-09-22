/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6a11cb',     // purple-600
        secondary: '#2575fc',   // blue-500
        dark: '#1a1a2e',        // dark background / text
        light: '#f4f4f9',       // light background
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #6a11cb, #2575fc)',
      },
    },
  },
  plugins: [],
}
