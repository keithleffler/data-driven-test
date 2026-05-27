import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',
  use: {
    baseURL: 'https://the-internet.herokuapp.com/',
  },
});
