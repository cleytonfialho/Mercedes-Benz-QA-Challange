import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './src/tests/',
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 60000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  /* Set only 1 workers for CI env. */
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? [['line'], ['html', { open: 'never'}]] : [['line'], ['html', { open: 'on-failure'}]],
  use: {
    //baseURL: 'https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo',

    video: 'retain-on-failure',
    screenshot: {
      mode: 'on',
      fullPage: true,
    },
    trace: 'retain-on-failure',
    testIdAttribute: 'data-test-id'
  },

  /* Configure projects for major browsers */
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
    }
  ],

});
