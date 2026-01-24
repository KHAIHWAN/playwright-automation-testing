import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    trace: 'on-first-retry',
  },

  projects: [
    // Setup project - รัน login และบันทึก authentication state
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // ใช้ authentication state ที่บันทึกไว้
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'], // รอให้ setup project เสร็จก่อน
    },
  ],

})