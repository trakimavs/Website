/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Values live in src/index.css as CSS variables, so a page can swap
        // them (see .theme-light there, used by the How to play page).
        obsidian: 'rgb(var(--obsidian) / <alpha-value>)',
        charcoal: 'rgb(var(--charcoal) / <alpha-value>)',
        'charcoal-light': 'rgb(var(--charcoal-light) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        'gold-light': 'rgb(var(--gold-light) / <alpha-value>)',
        ivory: 'rgb(var(--ivory) / <alpha-value>)',
        'ivory-muted': 'rgb(var(--ivory-muted) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Bodoni Moda', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
    },
  },
  plugins: [],
}
