/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#FF6701',
        primary: '#0D2B45',
        ink: '#000000',
        dark: '#131612', // Main/Dark — top header + dark form bg (distinct from pure black)
        green: '#62AD5A', // Main/Green — contact icons + director-form action color
        white: '#FFFFFF',
        bg: { DEFAULT: '#FFFFFF', subtle: '#F0F3F5', grey: '#F2F2F7', active: '#E3EBF1' },
        border: '#E5E6E8',
        muted: { DEFAULT: '#C4C4C4', text: '#6C757D' },
        secondary: '#737476',
      },
      fontFamily: {
        heading: ['Instrument Sans', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        // Vela Sans (Figma) → self-hosted Manrope, its OFL base. Real Vela files
        // can be dropped into public/fonts under the "Vela Sans" family to override.
        vela: ['Vela Sans', 'Manrope', 'sans-serif'],
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
