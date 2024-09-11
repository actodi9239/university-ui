// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'app-bg': "url('./images/school.png')", // Para App.js
        'component-bg': "url('../images/backg.png')", // Para otros componentes
      },
    },
  },
  plugins: [],
};
