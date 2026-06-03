/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        earth: {
          cream: '#fff8ea',
          beige: '#fbe7c1',
          olive: '#5c6339',
          darkolive: '#383e23',
          forest: '#161a0f',
          darkforest: '#0f120a',
          crimson: '#a3243c',
          wine: '#821a2c',
          amber: '#ffc344',
          sand: '#e8ddc5',
          charcoal: '#222718',
        }
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Playfair Display"', 'serif'],
        sans: ['"Outfit"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
