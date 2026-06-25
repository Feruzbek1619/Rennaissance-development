/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Luxury brand palette (client moodboard — Pedro-Araújo style): deep
        // slate + champagne gold + ivory/cream + warm grey. Token NAMES are kept
        // so the whole UI re-themes at once.
        accent: '#BE9C68', // champagne gold (CTAs / highlights / rules)
        'accent-dark': '#A2814E', // deeper gold for hover/active
        primary: '#38485A', // deep slate (dark panels / buttons)
        stone: '#8C8275', // complementary warm taupe (subtle accents)
        ink: '#26303B', // near-black slate (headings / body)
        dark: '#2A3744', // deep slate — top header + dark form bg
        green: '#9A8A63', // muted gold-olive (contact / success)
        white: '#FFFFFF',
        // Warm ivory base behind white cards; subtle/grey tones warmed up.
        bg: { DEFAULT: '#FBF8F2', subtle: '#F1EBE1', grey: '#F5F0E7', active: '#E9E1D4' },
        border: '#E6E0D6',
        muted: { DEFAULT: '#C9C5BD', text: '#7E7A72', field: '#9A968E', soft: '#8C887F' },
        secondary: '#7E7A72',
      },
      fontFamily: {
        // Elegant high-contrast serif headings (luxury) + clean sans body.
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Manrope', 'sans-serif'],
        // Vela Sans (Figma) → self-hosted Manrope, its OFL base.
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
