import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Only include project unit tests under `src/` and exclude node_modules and e2e tests
    include: ['src/**/*.test.{js,ts,tsx}', 'src/**/*.spec.{js,ts,tsx}', 'src/**/__tests__/**/*.{js,ts,tsx}'],
    exclude: ['node_modules/**', 'tests/**'],
  },
});
