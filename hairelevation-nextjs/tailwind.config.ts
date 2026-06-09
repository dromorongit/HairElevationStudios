import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C8A97E',
          'gold-dark': '#B8956A',
          'gold-deeper': '#A67C52',
          'gold-light': 'rgba(200, 169, 126, 0.15)',
          brown: '#3B2A23',
          'brown-dark': '#2A1E18',
          cream: '#F5EFE6',
          'warm-white': '#FAF8F5',
        },
        ui: {
          'text-primary': '#F5EFE6',
          'text-secondary': '#7A6055',
          'text-light': '#F5EFE6',
          'text-muted': 'rgba(245, 239, 230, 0.6)',
          border: 'rgba(200, 169, 126, 0.2)',
          'border-strong': 'rgba(200, 169, 126, 0.4)',
          overlay: 'rgba(26, 18, 8, 0.95)',
          'overlay-light': 'rgba(26, 18, 8, 0.6)',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '12px',
        modal: '20px',
      },
      boxShadow: {
        gold_glow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,169,126,0.2)',
        gold_glow_strong: '0 0 20px rgba(200,169,126,0.3), 0 0 0 2px rgba(200,169,126,0.3)',
        card: '0 8px 32px rgba(0,0,0,0.4)',
        card_hover: '0 12px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
} satisfies Config;