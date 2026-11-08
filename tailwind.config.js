/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0e0e0e',
        charcoal: '#1a1a1a',
        'charcoal-light': '#252525',
        gold: '#c9a84c',
        'gold-light': '#e2c47a',
        ivory: '#f5f0e8',
        'ivory-muted': '#c8bfad',
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
