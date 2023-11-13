module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('./src/plugins/button'),
      require('./src/plugins/inputs'),
      require('./src/plugins/layout'),
      require('./src/plugins/card'),
      require('./src/plugins/text'),
      require('./src/plugins/table'),
      require('./src/plugins/pagination'),
      require('./src/plugins/modal'),
      require('./src/plugins/checkbox')
    ],
  }