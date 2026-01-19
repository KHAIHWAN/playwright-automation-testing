import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#login-button').click();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    console.log(errorMessage);
});