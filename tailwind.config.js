/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  
theme: {
    extend: {
      backgroundImage: {
        'green-gradient': 'linear-gradient(to right, #126761 0%, #1D968A 50%, #25B9A8 100%)',
      },
    },
  },

  theme: {
    extend: {
      fontFamily: {
        default: ['Montserrat']
      }
    }
  },
  plugins: [require("daisyui")],
  darkMode: 'class'
}
