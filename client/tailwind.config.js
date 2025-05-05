/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        float: 'float 6s ease-in-out infinite',
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

