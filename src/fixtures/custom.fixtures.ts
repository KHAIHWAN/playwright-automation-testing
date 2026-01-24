import { test as base, expect } from '@playwright/test'

import { LoginPage } from '../pages/login.page'
import { InventoryPage } from '../pages/inventory.page'
import { CartPage } from '../pages/cart.page'
import { CheckoutStepOnePage } from '../pages/checkout-step-one.page'
import { CheckoutStepTwoPage } from '../pages/checkout-step-two.page'
import { CheckoutCompletePage } from '../pages/checkout-complete.page'

type CustomFixtures = {
    loginPage: LoginPage
    inventoryPage: InventoryPage
    cartPage: CartPage
    checkoutStepOnePage: CheckoutStepOnePage
    checkoutStepTwoPage: CheckoutStepTwoPage
    checkoutCompletePage: CheckoutCompletePage
}

export const test = base.extend<CustomFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page)
        await use(inventoryPage)
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page)
        await use(cartPage)
    },
    checkoutStepOnePage: async ({ page }, use) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page)
        await use(checkoutStepOnePage)
    },
    checkoutStepTwoPage: async ({ page }, use) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page)
        await use(checkoutStepTwoPage)
    },
    checkoutCompletePage: async ({ page }, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page)
        await use(checkoutCompletePage)
    }
})

export { expect } from '@playwright/test'