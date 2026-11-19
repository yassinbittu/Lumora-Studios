/** Colours and fonts live here – change them to re-skin the whole site. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F6F0E6',
        sand: '#E7DAC6',
        charcoal: '#23201E',
        clay: '#B5603F',
        stone: '#7A6F64',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
