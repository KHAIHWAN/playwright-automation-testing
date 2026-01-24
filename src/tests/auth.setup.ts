import { test as setup, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { VALID_USERS } from '../data-test/login.data'

const authFile = '.auth/user.json'

setup('authenticate user', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()

    await loginPage.login(VALID_USERS.STANDARD.username, VALID_USERS.STANDARD.password)

    // รอให้ login เสร็จก่อน
    await expect(page).toHaveURL('/inventory.html')

    // บันทึก authentication state
    await page.context().storageState({ path: authFile })
})