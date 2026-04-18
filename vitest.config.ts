import { resolve } from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      name: 'css-stub',
      transform(_, id) {
        if (id.endsWith('.css')) {
          return { code: 'export default {}' };
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@types': resolve(__dirname, './src/types/index.ts'),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    environment: 'jsdom',
    globals: true,
    server: {
      deps: {
        inline: ['@tarsilla/react-components', 'react-tabs'],
      },
    },
    setupFiles: ['./test/setup.ts'],
  },
});
