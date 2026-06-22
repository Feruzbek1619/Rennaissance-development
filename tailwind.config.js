/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#FF6701',
        primary: '#0D2B45',
        ink: '#000000',
        white: '#FFFFFF',
        bg: { DEFAULT: '#FFFFFF', subtle: '#F0F3F5', grey: '#F2F2F7' },
        border: '#E5E6E8',
        muted: { DEFAULT: '#C4C4C4', text: '#6C757D' },
        secondary: '#737476',
      },
      fontFamily: {
        heading: ['Instrument Sans', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'body-sm': ['16px', { lineHeight: '1.6' }],
        'body-md': ['18px', { lineHeight: '1.6' }],
        'body-lg': ['20px', { lineHeight: '1.6' }],
        h6: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h5: ['25px', { lineHeight: '1.4', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}
