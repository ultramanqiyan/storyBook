import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['functions/**/*.js'],
      exclude: ['functions/api/version.js'],
      branches: 80,
      lines: 80,
      functions: 80,
      statements: 80
    },
    testTimeout: 10000,
    includeSource: ['config/**/*.json']
  },
  assetsInclude: ['**/*.json']
});
