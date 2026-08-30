/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D71920',
          'red-dark': '#B81418',
          'red-light': '#E31E24',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          100: '#111111',
          200: '#1F1F1F',
        },
        gray: {
          brand: '#666666',
          light: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
        lg: '12px',
        xl: '14px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
        nav: '0 2px 8px rgba(0, 0, 0, 0.06)',
        'nav-dark': '0 2px 8px rgba(0, 0, 0, 0.3)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
};
