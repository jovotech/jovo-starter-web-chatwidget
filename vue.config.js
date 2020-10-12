module.exports = {
  parallel: false,
  css: {
    loaderOptions: {
      postcss: {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        plugins: [
          require('postcss-import'),
          require('tailwindcss'),
          require('postcss-nested'),
          require('postcss-custom-properties'),
          require('autoprefixer'),
        ],
      },
    },
  },
};
