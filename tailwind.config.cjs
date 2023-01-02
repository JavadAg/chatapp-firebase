/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      // prettier-ignore
      colors: {
        'bg-primary': '#cfd9df',
        'bg-secondary': '#e2ebf0',
        'bg-dark-primary': '#121212',
        'bg-dark-secondary': '#000000',
        'main-primary': '#F5F7FB',
        'main-dark-primary': '#3E4756',
        'main-secondary': '#FFFFFF',
        'main-dark-secondary': '',
        purple: {
          100: '#e6dff3',
          200: '#cebfe7',
          300: '#b59eda',
          400: '#9d7ece',
          500: '#845ec2',
          600: '#6a4b9b',
          700: '#4f3874',
          800: '#35264e',
          900: '#1a1327',
        },
        'text-primary': '#333333',
        'text-secondary': '#6A6A6A',
      },
    },
  },
  plugins: [],
}
