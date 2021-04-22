/* eslint-disable no-undef */
module.exports = {
  purge: [
    './src/**/*.css',
    './src/**/*.tsx',
  ],
  darkMode: false,
  theme: {
    extend: {
      height: {
        'screen-56': 'calc(100vh - 56px)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   outline: false,
  // }
}
