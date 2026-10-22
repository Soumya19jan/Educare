/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#b3e6ff',
          200: '#80d4ff',
          300: '#4dc3ff',
          400: '#1ab1ff',
          500: '#0099e6',
          600: '#0077b3',
          700: '#005580',
          800: '#00334d',
          900: '#00111a',
        },
        secondary: {
          50: '#f0f9f5',
          100: '#dcf0e8',
          200: '#b8e1d1',
          300: '#94d2ba',
          400: '#70c3a3',
          500: '#4cb48c',
          600: '#3a9070',
          700: '#286c54',
          800: '#164838',
          900: '#04241c',
        },
        dark: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          850: '#181b20',
          900: '#121519',
          950: '#0a0d12',
        },
        coral: {
          DEFAULT: '#e8553d',
          dark: '#c44430',
          light: '#f9c6bc',
        },
        yellow: {
          DEFAULT: '#f5c842',
          dark: '#d4a820',
          light: '#fff3b8',
        },
        forest: {
          DEFAULT: '#2ec4b6',
          dark: '#1b8a80',
          light: '#c6f0d8',
        },
        cream: {
          DEFAULT: '#faf9f5',
          dark: '#f0ede4',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Fredoka', 'cursive', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'depth': '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow': '0 0 40px rgba(0, 153, 230, 0.3)',
        'glow-secondary': '0 0 40px rgba(76, 180, 140, 0.3)',
      },
    },
  },
  plugins: [],
}