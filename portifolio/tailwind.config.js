/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Half for doubling the skills array
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
      },
      colors: {
        primary: '#7E22CE',
        accent: '#A855F7',
        background: '#F5F3FF',
        text: '#1E1B4B',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #7E22CE, #A855F7)',
      },
    },
  },
  plugins: [],
}

