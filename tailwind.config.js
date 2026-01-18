/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // Premium neutral palette (warmer tones)
        'surface': {
          DEFAULT: '#fafaf8',  // Warm off-white background
          secondary: '#f5f5f3',
          tertiary: '#ffffff',
        },
        'text': {
          primary: '#1a1a1a',
          secondary: '#555555',
          tertiary: '#666666',
          muted: '#999999',
        },
        'border': {
          DEFAULT: '#e5e5e5',
          subtle: '#f0f0f0',
          strong: '#d5d5d5',
        },
        // Brand colors
        'brand': {
          DEFAULT: '#cc2936',
          light: '#ff4d5a',
          dark: '#b02430',
          muted: 'rgba(204, 41, 54, 0.1)',
        },
        // Legacy support
        'gray-apple': {
          50: '#fafafa',
          100: '#f5f5f7',
          200: '#e8e8ed',
          300: '#d2d2d7',
          400: '#86868b',
          500: '#6e6e73',
          600: '#1d1d1f',
        },
        'accent': {
          DEFAULT: '#cc2936',
          light: '#ff4d5a',
          dark: '#b02430',
        },
      },
      boxShadow: {
        // Premium shadow scale
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'high': '0 16px 48px rgba(0, 0, 0, 0.12)',
        'brand': '0 8px 24px rgba(204, 41, 54, 0.25)',
        'brand-lg': '0 16px 40px rgba(204, 41, 54, 0.30)',
      },
      borderRadius: {
        // Consistent radius scale (Apple-inspired)
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      spacing: {
        // Premium spacing scale
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
