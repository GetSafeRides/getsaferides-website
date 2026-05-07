/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        darkSurface: 'rgb(var(--color-dark-surface) / <alpha-value>)',
        onSurface: 'rgb(var(--color-on-surface) / <alpha-value>)',
        subdued: 'rgb(var(--color-subdued) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        onPrimary: 'rgb(var(--color-on-primary) / <alpha-value>)',
        borderColor: 'rgb(var(--color-border) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        frame: 'inset 0 0 0 1px rgba(255,255,255,0.2)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 680ms ease-out both',
      },
    },
  },
  plugins: [],
};
