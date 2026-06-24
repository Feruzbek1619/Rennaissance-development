/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (Pedro-Araújo-style): slate + warm gold + cream + a
        // stone bridge tone. Keep token NAMES so the whole UI re-themes at once.
        accent: '#B0925E', // warm gold (CTAs / highlights) — was orange
        primary: '#3A4754', // slate (dark panels / buttons) — was navy
        stone: '#8C8275', // complementary warm taupe (subtle accents)
        ink: '#232A33', // near-black warm slate (headings / body)
        dark: '#2A323B', // deep slate — top header + dark form bg
        green: '#9A8A63', // repurposed to muted gold-olive (contact / success)
        white: '#FFFFFF',
        bg: { DEFAULT: '#FFFFFF', subtle: '#EEEBE4', grey: '#F1EFEA', active: '#E7E2D8' },
        border: '#E4E1DB',
        muted: { DEFAULT: '#C9C5BD', text: '#7E7A72', field: '#9A968E', soft: '#8C887F' },
        secondary: '#7E7A72',
      },
      fontFamily: {
        heading: ['MTS Compact', 'Manrope', 'sans-serif'],
        body: ['Poppins', 'Manrope', 'sans-serif'],
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
