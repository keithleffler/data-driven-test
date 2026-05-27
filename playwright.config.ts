import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',
  use: {
    baseURL: 'https://example.com',
  },
});
