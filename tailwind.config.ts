import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: 'rgb(var(--white) / <alpha-value>)',
        black: 'rgb(var(--black) / <alpha-value>)',
        grey: {
          50: 'rgb(var(--grey-50) / <alpha-value>)',
          100: 'rgb(var(--grey-100) / <alpha-value>)',
          200: 'rgb(var(--grey-200) / <alpha-value>)',
          300: 'rgb(var(--grey-300) / <alpha-value>)',
          400: 'rgb(var(--grey-400) / <alpha-value>)',
          500: 'rgb(var(--grey-500) / <alpha-value>)',
          600: 'rgb(var(--grey-600) / <alpha-value>)',
          700: 'rgb(var(--grey-700) / <alpha-value>)',
          800: 'rgb(var(--grey-800) / <alpha-value>)',
          900: 'rgb(var(--grey-900) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Helvetica Neue', 'sans-serif'],
        display: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '-0.01em',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.43, 0.195, 0.02, 1.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s var(--ease-out-expo)',
        'fade-in-up': 'fadeInUp 0.8s var(--ease-out-expo)',
        'slide-in-left': 'slideInLeft 0.8s var(--ease-out-expo)',
        'scale-in': 'scaleIn 0.8s var(--ease-out-expo)',
        'reveal': 'reveal 1s var(--ease-out-expo)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
