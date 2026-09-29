/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0e14',
        'bg-secondary': '#111923',
        'bg-hover': '#16212d',
        'accent-teal': '#00e5c3',
        'accent-teal-hover': '#33ebd1',
        'accent-teal-active': '#00ccad',
        'accent-amber': '#f0a030',
        'accent-amber-hover': '#f3b355',
        'accent-red': '#ff3b4e',
        'accent-red-hover': '#ff6271',
        'text-primary': '#e8ece4',
        'text-muted': '#5a6a7a',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        panel: '4px',
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        'glow-teal': '0 0 15px rgba(0, 229, 195, 0.4)',
        'glow-teal-sm': '0 0 8px rgba(0, 229, 195, 0.3)',
        'glow-amber': '0 0 15px rgba(240, 160, 48, 0.4)',
        'panel': '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 229, 195, 0.05)',
        'panel-hover': '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 229, 195, 0.1)',
      },
    },
  },
  plugins: [],
}
