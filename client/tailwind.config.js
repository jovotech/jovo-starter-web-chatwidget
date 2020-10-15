module.exports = {
  future: {
    defaultLineHeights: true,
    standardFontWeights: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      backgroundColor: {
        windowBody: '#ECECEC',
        primary: '#434A65',
      },
      maxWidth: {
        half: '50%'
      }
    },
  },
  variants: {},
  plugins: [],
};
