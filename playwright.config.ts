import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  fullyParallel: true,
  workers:process.env.CI ? 4 : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  retries: 0,
  testDir: './playwright/tests',
  use: {
    baseURL: 'https://the-internet.herokuapp.com/',
  },
  


});
