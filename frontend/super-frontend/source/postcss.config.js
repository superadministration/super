module.exports = {
  plugins: [
    require("postcss-import")(),
    require("postcss-inline-svg"),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ],
};
