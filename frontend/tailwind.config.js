/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        stitch: {
          primary: '#3525cd',
          'primary-container': '#4f46e5',
          secondary: '#00687a',
          'secondary-container': '#06b6d4',
          surface: '#f8f9ff',
          'surface-low': '#eff4ff',
          'surface-container': '#e5eeff',
          'surface-high': '#dce9ff',
          'on-surface': '#0b1c30',
          'on-surface-variant': '#464555',
        }
      },
    },
  },
  plugins: [],
}
