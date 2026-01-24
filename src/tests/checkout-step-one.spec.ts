import { test, expect } from '../fixtures/custom.fixtures'

import { URLS } from '../data-test/login.data'

import { CHECKOUT_DATA, ERROR_MESSAGES_CHECKOUT } from '../data-test/checkout.data'

test.describe('Checkout Step One Page', () => {

    test.describe('TC-CHECKOUT-01 - 02: Cart Badge Display', () => {
        test('TC-CHECKOUT-01: แสดงจำนวนสินค้าใน badge ตะกร้า ตรงกับจำนวนสินค้าในตะกร้า', async ({ inventoryPage, cartPage, checkoutStepOnePage }) => {
            await inventoryPage.goto()
            await inventoryPage.addMultipleItemsToCart(3)
            
            const badgeCountInventory = await inventoryPage.getCartBadgeCount()
            
            await cartPage.goto()
            const badgeCountCart = await cartPage.getCartBadgeCount()
            
            await checkoutStepOnePage.goto()
            await checkoutStepOnePage.waitForCheckoutPageToLoad()
            
            const badgeCountCheckout = await checkoutStepOnePage.getCartBadgeCount()
            
            expect(badgeCountInventory).toBe(3)
            expect(badgeCountCart).toBe(3)
            expect(badgeCountCheckout).toBe(3)
        })

        test('TC-CHECKOUT-02: ไม่แสดง badge ตะกร้า เมื่อไม่มีสินค้าในตะกร้า', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.goto()
    
            expect(await checkoutStepOnePage.isCartBadgeVisible()).toBeFalsy()
            expect(await checkoutStepOnePage.getCartBadgeCount()).toBe(0)
        })
    })

    test.describe('TC-CHECKOUT-03 - 06: Cancel Button', () => {
        test('TC-CHECKOUT-03: ไปยังหน้า Checkout Step One เมื่อคลิกปุ่ม Cancel กลับไปยัง cart page', async ({ inventoryPage, cartPage, checkoutStepOnePage, page }) => {
            await inventoryPage.goto()
            await inventoryPage.clickCartIcon()

            await page.waitForURL(URLS.CART)

            await cartPage.clickCheckout()
    
            await checkoutStepOnePage.clickCancel()
    
            await expect(page).toHaveURL(URLS.CART)
            expect(await cartPage.isOnCartPage()).toBeTruthy()
        })

        test('TC-CHECKOUT-04: คงจำนวนสินค้าใน badge ไว้เมื่อคลิกปุ่ม Cancel กลับไปยังหน้า cart page', async ({ inventoryPage, cartPage, checkoutStepOnePage, page }) => {
            await inventoryPage.goto()
            await inventoryPage.addMultipleItemsToCart(3)
            const itemCountBefore = await inventoryPage.getCartBadgeCount()
            
            await inventoryPage.clickCartIcon()

            await page.waitForURL(URLS.CART)
    
            await cartPage.clickCheckout()
            await checkoutStepOnePage.clickCancel()
    
            const itemCountAfter = await cartPage.getCartItemCount()
            
            expect(itemCountAfter).toBe(itemCountBefore)
            expect(itemCountAfter).toBe(3)
        })
    })

    test.describe('TC-CHECKOUT-05 - 12: Form Validation', () => {
        test.beforeEach(async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.goto()
            await checkoutStepOnePage.waitForCheckoutPageToLoad()
        })

        test('TC-CHECKOUT-05: แสดง error เมื่อไม่กรอก First Name, Last Name, Zip Code', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
            const errorMsg = await checkoutStepOnePage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES_CHECKOUT.FIRST_NAME_REQUIRED)
        })

        test('TC-CHECKOUT-06: แสดง error เมื่อกรอกแค่ First Name', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.fillFirstName(CHECKOUT_DATA.VALID.firstName)
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
            const errorMsg = await checkoutStepOnePage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES_CHECKOUT.LAST_NAME_REQUIRED)
        })

        test('TC-CHECKOUT-07: แสดง error เมื่อกรอกแค่ Last Name', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.fillLastName(CHECKOUT_DATA.VALID.lastName)
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
            const errorMsg = await checkoutStepOnePage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES_CHECKOUT.FIRST_NAME_REQUIRED)
        })

        test('TC-CHECKOUT-08: แสดง error เมื่อกรอกแค่ Zip Code', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.fillZipCode(CHECKOUT_DATA.VALID.zipCode)
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
            const errorMsg = await checkoutStepOnePage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES_CHECKOUT.FIRST_NAME_REQUIRED)
        })

        test('TC-CHECKOUT-09: แสดง error เมื่อกรอกแค่ First Name และ Last Name แต่ไม่กรอก Zip Code', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.fillFirstName(CHECKOUT_DATA.VALID.firstName)
            await checkoutStepOnePage.fillLastName(CHECKOUT_DATA.VALID.lastName)
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
            const errorMsg = await checkoutStepOnePage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES_CHECKOUT.ZIP_CODE_REQUIRED)
        })

        test('TC-CHECKOUT-10: แสดง error เมื่อกรอกแค่ First Name และ Zip Code แต่ไม่กรอก Last Name', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.fillFirstName(CHECKOUT_DATA.VALID.firstName)
            await checkoutStepOnePage.fillZipCode(CHECKOUT_DATA.VALID.zipCode)
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
            const errorMsg = await checkoutStepOnePage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES_CHECKOUT.LAST_NAME_REQUIRED)
        })

        test('TC-CHECKOUT-11: แสดง error เมื่อกรอกแค่ Last Name และ Zip Code แต่ไม่กรอก First Name', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.fillLastName(CHECKOUT_DATA.VALID.lastName)
            await checkoutStepOnePage.fillZipCode(CHECKOUT_DATA.VALID.zipCode)
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
            const errorMsg = await checkoutStepOnePage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES_CHECKOUT.FIRST_NAME_REQUIRED)
        })

        test('TC-CHECKOUT-12: ไปยังหน้า Checkout Step Two เมื่อกรอกทุกฟิลด์', async ({ checkoutStepOnePage, page }) => {
            await checkoutStepOnePage.fillCheckoutInfo(CHECKOUT_DATA.VALID)
            await checkoutStepOnePage.clickContinue()
    
            await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO)
        })

        test('TC-CHECKOUT-13: ไปยังหน้า Checkout Step Two เมื่อกรอก special characters ในทุกฟิลด์', async ({ checkoutStepOnePage, page }) => {
            await checkoutStepOnePage.fillCheckoutInfo(CHECKOUT_DATA.SPECIAL_CHARS)
            await checkoutStepOnePage.clickContinue()
    
            await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO)
        })

    })

    test.describe('TC-CHECKOUT-14 - 17: Keyboard Navigation', () => {
        test.beforeEach(async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.goto()
        })

        test('TC-CHECKOUT-14: รองรับการใช้งานปุ่ม Tab สำหรับกรอกข้อมูล', async ({ checkoutStepOnePage, page }) => {
            await checkoutStepOnePage.focusFirstName()
            await checkoutStepOnePage.fillFirstName(CHECKOUT_DATA.VALID.firstName)
            await checkoutStepOnePage.pressTabOnFirstName()
    
            let focused = await page.locator(':focus')
            await expect(focused).toHaveAttribute('data-test', 'lastName')
    
            await checkoutStepOnePage.fillLastName(CHECKOUT_DATA.VALID.lastName)
            await checkoutStepOnePage.pressTabOnLastName()
    
            focused = await page.locator(':focus')
            await expect(focused).toHaveAttribute('data-test', 'postalCode')
        })

        test('TC-CHECKOUT-15: รองรับการใช้งานปุ่ม Shift+Tab สำหรับการย้อนกลับ', async ({ checkoutStepOnePage, page }) => {
            await checkoutStepOnePage.focusZipCode()
            await page.keyboard.press('Shift+Tab')
    
            let focused = await page.locator(':focus')
            await expect(focused).toHaveAttribute('data-test', 'lastName')
    
            await page.keyboard.press('Shift+Tab')
            focused = await page.locator(':focus')
            await expect(focused).toHaveAttribute('data-test', 'firstName')
        })

        test('TC-CHECKOUT-16: เมื่อกรอกข้อมูลครบแล้วกดปุ่ม Enter ต้องไปยังหน้า Checkout Step Two', async ({ checkoutStepOnePage, page }) => {
            await checkoutStepOnePage.fillWithKeyboardNavigation(CHECKOUT_DATA.VALID)
            
            await expect(page).toHaveURL(URLS.CHECKOUT_STEP_TWO)
        })

        test('TC-CHECKOUT-17: แสดง error เมื่อกรอกข้อมูลไม่ครบ และกดปุ่ม Enter', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.focusFirstName()
            await checkoutStepOnePage.pressEnterOnFirstName()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
        })

    })

    test.describe('TC-CHECKOUT-18 - 19: Error Message Handling', () => {
        test.beforeEach(async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.goto()
        })

        test('TC-CHECKOUT-18: แสดงปุ่ม X เพื่อปิด error message', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeTruthy()
    
            await checkoutStepOnePage.closeError()
    
            expect(await checkoutStepOnePage.isErrorVisible()).toBeFalsy()
        })

        test('TC-CHECKOUT-19: แสดง error message ต่างๆ ตาม field ที่ไม่ครบ', async ({ checkoutStepOnePage }) => {
            await checkoutStepOnePage.fillLastName('Doe')
            await checkoutStepOnePage.fillZipCode('12345')
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
            let error = await checkoutStepOnePage.getErrorMessage()
            expect(error).toContain(ERROR_MESSAGES_CHECKOUT.FIRST_NAME_REQUIRED)
            
            await checkoutStepOnePage.clearAllFields()
            await checkoutStepOnePage.fillFirstName('John')
            await checkoutStepOnePage.fillZipCode('12345')
            await checkoutStepOnePage.clickContinue()
            await checkoutStepOnePage.waitForErrorMessage()
            error = await checkoutStepOnePage.getErrorMessage()
            expect(error).toContain(ERROR_MESSAGES_CHECKOUT.LAST_NAME_REQUIRED)
        })
    })
})
