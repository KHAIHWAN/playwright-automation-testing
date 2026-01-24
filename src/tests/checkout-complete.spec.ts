import { test, expect } from '../fixtures/custom.fixtures'

import { URLS, CHECKOUT_DATA } from '../data-test/login.data'

test.describe('TC-CHECKOUT-COMPLETE-01 - 02: Cart Badge Removal', () => {
    test('TC-CHECKOUT-COMPLETE-01: ตรวจสอบไม่มี badge หลังจาก checkout', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage,
        checkoutCompletePage
    }) => {

        await inventoryPage.goto()
        await inventoryPage.addMultipleItemsToCart(3)


        expect(await inventoryPage.getCartBadgeCount()).toBe(3)
        expect(await inventoryPage.isCartBadgeVisible()).toBeTruthy()


        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)
        await checkoutStepTwoPage.clickFinish()


        await checkoutCompletePage.waitForCompletePageToLoad()

        expect(await checkoutCompletePage.isCartBadgeVisible()).toBeFalsy()
        expect(await checkoutCompletePage.getCartBadgeCount()).toBe(0)
        expect(await checkoutCompletePage.isCartEmpty()).toBeTruthy()
    })

    test('TC-CHECKOUT-COMPLETE-02: ตรวจสอบว่า cart ไม่มีสินค้าแล้วหลังจาก checkout ทุก และตรวจสอบที่ cart page', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage,
        checkoutCompletePage,
        page
    }) => {
        await inventoryPage.goto()
        await inventoryPage.addMultipleItemsToCart(2)

        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)
        await checkoutStepTwoPage.clickFinish()

        await checkoutCompletePage.clickCartIcon()
        await expect(page).toHaveURL(URLS.CART)

        expect(await cartPage.isCartEmpty()).toBeTruthy()
        expect(await cartPage.getCartItemCount()).toBe(0)
    })
})

test.describe('TC-CHECKOUT-COMPLETE-03: Success Messages', () => {
    test.beforeEach(async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage,
        checkoutCompletePage
    }) => {
        await inventoryPage.goto()
        await inventoryPage.addToCartByIndex(0)
        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)
        await checkoutStepTwoPage.clickFinish()
        await checkoutCompletePage.waitForCompletePageToLoad()
    })

    test('TC-CHECKOUT-COMPLETE-03: ตรวจสอบว่ามีส่วนต่างๆที่ต้องการแสดงหรือไม่', async ({ checkoutCompletePage }) => {
        const verification = await checkoutCompletePage.verifyCompletePage()
    
        expect(verification.headerVisible).toBeTruthy()
        expect(verification.messageVisible).toBeTruthy()
        expect(verification.imageVisible).toBeTruthy()
        expect(verification.buttonVisible).toBeTruthy()
        expect(verification.cartEmpty).toBeTruthy()
    })

})

test.describe('TC-CHECKOUT-COMPLETE-04 - 05: Back Home Button', () => {
    test.beforeEach(async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage,
        checkoutCompletePage
    }) => {

        await inventoryPage.goto()
        await inventoryPage.addToCartByIndex(0)
        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)
        await checkoutStepTwoPage.clickFinish()
        await checkoutCompletePage.waitForCompletePageToLoad()
    })

    test('TC-CHECKOUT-COMPLETE-04: ตรวจสอบว่ากดปุ่ม Back Home แล้วจะไปหน้า inventory หรือไม่', async ({ 
        checkoutCompletePage,
        inventoryPage,
        page 
    }) => {
        await checkoutCompletePage.clickBackHome()
    
        await expect(page).toHaveURL(URLS.INVENTORY)
        expect(await inventoryPage.isOnInventoryPage()).toBeTruthy()
    })

    test('TC-CHECKOUT-COMPLETE-05: ตรวจสอบว่ากดปุ่ม Back Home แล้วจะไม่มีสินค้าในตะกร้า', async ({ 
        checkoutCompletePage,
        inventoryPage
    }) => {
        await checkoutCompletePage.clickBackHome()
    
        expect(await inventoryPage.isCartBadgeVisible()).toBeFalsy()
        expect(await inventoryPage.getCartBadgeCount()).toBe(0)
    })

})