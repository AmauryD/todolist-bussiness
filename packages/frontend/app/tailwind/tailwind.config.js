module.exports = {
  content: ['./app/**/*.{hbs,js,ts,html}', './tests/**/*.{hbs,js,ts,html}'],
  corePlugins: {},
  plugins: [],
  theme: {
    extends: {
      screens: {
        lxg: '1140px',
        '2xl': '1600px',
        '3xl': '1680px',
      },
    },
  },
};
