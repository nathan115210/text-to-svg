import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8', // Use V8 for faster coverage
      reportsDirectory: './coverage', // Optional
    },
  },
});
