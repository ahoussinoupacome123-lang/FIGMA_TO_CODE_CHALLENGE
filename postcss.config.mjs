// During unit tests (Vitest) avoid resolving PostCSS plugins to prevent
// environment-specific resolution issues. Vitest sets `process.env.VITEST`.
const isTest = Boolean(process.env.VITEST);

const config = {
  plugins: isTest ? [] : ["@tailwindcss/postcss"],
};

export default config;
