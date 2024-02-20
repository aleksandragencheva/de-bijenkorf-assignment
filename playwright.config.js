const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  
  use: {
    baseURL: 'https://www.debijenkorf.nl/page/checkout/overwritebasket?products=119209008798100%7C1',
    trace: 'on-first-retry',
  },

  projects: [
    /* Chromium didn't really want to work*/
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});

