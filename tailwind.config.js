/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 10px rgba(96, 165, 250, 0.7), 0 0 20px rgba(96, 165, 250, 0.4)' 
          },
          '50%': { 
            opacity: '0.85',
            boxShadow: '0 0 15px rgba(96, 165, 250, 0.9), 0 0 25px rgba(96, 165, 250, 0.6)'
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
    },
  },
  plugins: [],
};
