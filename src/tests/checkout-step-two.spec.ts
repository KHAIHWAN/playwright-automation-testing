import { test, expect } from '../fixtures/custom.fixtures'

import { URLS, CHECKOUT_DATA } from '../data-test/login.data'

test.describe('TC-CHECKOUT-STEP-TWO-01: Cart Badge Display', () => {
    test('TC-CHECKOUT-STEP-TWO-01: แสดง badge ตรงกับจำนวนสินค้าในตะกร้า', async ({ 
        inventoryPage, 
        cartPage, 
        checkoutStepOnePage,
        checkoutStepTwoPage 
    }) => {
        await inventoryPage.goto()
        await inventoryPage.addMultipleItemsToCart(4)
    
        const badgeCountInventory = await inventoryPage.getCartBadgeCount()
    
        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)
        await checkoutStepTwoPage.waitForCheckoutSummaryToLoad()
    
        const badgeCountStepTwo = await checkoutStepTwoPage.getCartBadgeCount()
        const itemCount = await checkoutStepTwoPage.getCartItemCount()
    
        expect(badgeCountInventory).toBe(4)
        expect(badgeCountStepTwo).toBe(4)
        expect(itemCount).toBe(4)
        expect(await checkoutStepTwoPage.doesBadgeMatchItemCount()).toBeTruthy()
    })
})

test.describe('TC-CHECKOUT-STEP-TWO-02 - 03: Product Information Validation', () => {
    test('TC-CHECKOUT-STEP-TWO-02: ตรวจสอบชื่อสินค้าที่ถูกเพิ่มในตะกร้า ตรงกันหรือไม่ ในหน้า checkout step two', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage 
    }) => {
        await inventoryPage.goto()
    
        const expectedNames = [
            await inventoryPage.getProductNameByIndex(0),
            await inventoryPage.getProductNameByIndex(2),
            await inventoryPage.getProductNameByIndex(4)
        ]

        await inventoryPage.addToCartByIndex(0)
        await inventoryPage.addToCartByIndex(2)
        await inventoryPage.addToCartByIndex(4)

        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)

        const summaryNames = await checkoutStepTwoPage.getItemNames()
    
        expect(summaryNames).toEqual(expect.arrayContaining(expectedNames))
        expect(summaryNames.length).toBe(expectedNames.length)
    })

    test('TC-CHECKOUT-STEP-TWO-03: ตรวจสอบราคาสินค้าที่ถูกเพิ่มในตะกร้า ตรงกันหรือไม่ ในหน้า checkout step two', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage 
    }) => {
        await inventoryPage.goto()
    
        const expectedPrices = [
            await inventoryPage.getProductPriceByIndex(0),
            await inventoryPage.getProductPriceByIndex(1),
            await inventoryPage.getProductPriceByIndex(3)
        ]

        await inventoryPage.addToCartByIndex(0)
        await inventoryPage.addToCartByIndex(1)
        await inventoryPage.addToCartByIndex(3)

        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)

        const summaryPrices = await checkoutStepTwoPage.getItemPrices()
    
        expect(summaryPrices).toEqual(expect.arrayContaining(expectedPrices))
    })
})

test.describe('TC-CHECKOUT-STEP-TWO-04 - 06: Tax Calculation', () => {
    test('TC-CHECKOUT-STEP-TWO-04: ตรวจสอบการคำนวณภาษี', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage 
    }) => {
        await inventoryPage.goto()
        await inventoryPage.addMultipleItemsToCart(3)

        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)

        expect(await checkoutStepTwoPage.isTaxCalculationCorrect()).toBeTruthy()
    })

    test('TC-CHECKOUT-STEP-TWO-05: ตรวจสอบการคำนวนยอดรวม Item total ไม่รวมภาษี', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage 
    }) => {
        await inventoryPage.goto()
        await inventoryPage.addMultipleItemsToCart(4)

        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)

        expect(await checkoutStepTwoPage.isSubtotalCorrect()).toBeTruthy()
    })

    test('TC-CHECKOUT-STEP-TWO-06: ตรวจสอบการคำนวนยอดรวม Item total + ภาษี', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage 
    }) => {
        await inventoryPage.goto()
        await inventoryPage.addMultipleItemsToCart(5)

        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)

        expect(await checkoutStepTwoPage.isTotalCalculationCorrect()).toBeTruthy()
    })

})

test.describe('TC-CHECKOUT-STEP-TWO-07 : Cancel Button', () => {
    test('TC-CHECKOUT-STEP-TWO-07: ตรวจสอบการกดปุ่ม Cancel ต้องไปหน้า checkout step one', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage,
        page 
    }) => {
        await inventoryPage.goto()
        await inventoryPage.addToCartByIndex(0)

        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)
    
        await checkoutStepTwoPage.clickCancel()

        await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE)
        expect(await checkoutStepOnePage.isOnCheckoutStepOnePage()).toBeTruthy()
    })

})

test.describe('TC-CHECKOUT-STEP-TWO-08: Finish Button', () => {
    test('TC-CHECKOUT-STEP-TWO-08: ตรวจสอบการกดปุ่ม Finish ต้องไปหน้า checkout complete', async ({ 
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage,
        page 
    }) => {
        await inventoryPage.goto()
        await inventoryPage.addToCartByIndex(0)

        await inventoryPage.clickCartIcon()
        await cartPage.clickCheckout()
        await checkoutStepOnePage.fillAndContinue(CHECKOUT_DATA.VALID)
    
        await checkoutStepTwoPage.clickFinish()

        await expect(page).toHaveURL(URLS.CHECKOUT_COMPLETE)
    })

})