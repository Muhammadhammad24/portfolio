/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    // The project ships an autoprefixer dependency; without it listed here
    // nothing was prefixing anything.
    autoprefixer: {},
  },
};

export default config;
