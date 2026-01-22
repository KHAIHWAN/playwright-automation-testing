import { test as base, expect } from '@playwright/test'

// import class 
import { LoginPage } from '../../pages/login.page'
import { InventoryPage } from '../../pages/inventory.page'

// import data
import { loginData } from '../../data-test/login.data'

type Fixtures = {
    loginPage: LoginPage
    inventoryPage: InventoryPage
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    inventoryPage: async ({ page, loginPage }, use) => {
        await loginPage.goto()
        await loginPage.login(loginData.valid.username, loginData.valid.password)
        await expect(page).toHaveURL('/inventory.html')
        await use(new InventoryPage(page))
    }
})

export { expect } from '@playwright/test'