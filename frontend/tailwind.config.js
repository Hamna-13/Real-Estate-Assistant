/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'sans-serif']
      },
      colors: {
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.1)',
        ring: 'rgba(255, 255, 255, 0.2)',
        background: '#050505',
        foreground: '#ffffff',
        primary: {
          DEFAULT: '#ffffff',
          foreground: '#000000'
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          foreground: '#e5e5e5'
        },
        muted: {
          DEFAULT: '#262626',
          foreground: '#a3a3a3'
        },
        accent: {
          DEFAULT: '#333333',
          foreground: '#ffffff'
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff'
        },
        card: {
          DEFAULT: '#0a0a0a',
          foreground: '#ffffff'
        },
        popover: {
          DEFAULT: '#0a0a0a',
          foreground: '#ffffff'
        }
      },
      borderRadius: {
        lg: '0rem',
        md: '0rem',
        sm: '0rem'
      },
      backdropBlur: {
        'glass': '24px'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};