/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Poller One', 'sans-serif'],
        'sans': ['Josefin Sans', 'sans-serif']
      },
      colors: {
        primary: '#E54646',
        bodyColor: '#1A1A1A',
        bodybg: '#F6F4EF',
      },         
      backgroundImage: {
        'banner': "url('images/banner-image1.jpg')",
        'footer': "url('images/footer-bg.jpg')"
      }
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: { color: theme("colors.bodyColor") },
      });
    }),
    require('@tailwindcss/forms'),
  ],
}

