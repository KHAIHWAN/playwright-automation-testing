import { test, expect } from '../fixtures/custom.fixtures'

import { URLS } from '../data-test/login.data'

test.describe('Cart Page', () => {

    test.describe('TC-CART-01 - 03: Test Cart Badge Display', () => {
        test('TC-CART-01: แสดงจำนวนสินค้าในตะกร้า ตรงกับจำนวนสินค้าที่เพิ่ม', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
            await inventoryPage.addToCartByIndex(0)
            await inventoryPage.addToCartByIndex(1)
            await inventoryPage.addToCartByIndex(2)

            // Go to cart page
            await cartPage.goto()
            await cartPage.waitForCartToLoad()

            // Check badge ตรงกับจำนวนสินค้า
            const itemCount = await cartPage.getCartItemCount()
            const badgeCount = await cartPage.getCartBadgeCount()
    
            expect(itemCount).toBe(3)
            expect(badgeCount).toBe(3)
            expect(await cartPage.doesBadgeMatchItemCount()).toBeTruthy()
        })

        test('TC-CART-02: ไม่มีแสดง badge ถ้าไม่มีสินค้าในตะกร้า ', async ({ cartPage }) => {
            await cartPage.goto()
    
            expect(await cartPage.isCartEmpty()).toBeTruthy()
            expect(await cartPage.isCartBadgeVisible()).toBeFalsy()
        })

        test('TC-CART-03: อัปเดต badge ถ้าเพิ่มหรือลบสินค้า ', async ({ inventoryPage, cartPage }) => {
            // เพิ่มสินค้า
            await inventoryPage.goto()
            await inventoryPage.addMultipleItemsToCart(4)

            await cartPage.goto()
            expect(await cartPage.getCartBadgeCount()).toBe(4)

            // ลบสินค้า 1 ชิ้น
            await cartPage.removeItemByIndex(0)
            expect(await cartPage.getCartBadgeCount()).toBe(3)

            // ลบสินค้าอีก 1 ชิ้น
            await cartPage.removeItemByIndex(0)
            expect(await cartPage.getCartBadgeCount()).toBe(2)
        })
    })

    test.describe('TC-CART-04 - 06: Test Product Information Validation', () => {
        test('TC-CART-04: ตรวจสอบชื่อสินค้าตรงกับที่เลือก หรือไม่ ใน cart page ', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
    
            const expectedNames = [
                await inventoryPage.getProductNameByIndex(0),
                await inventoryPage.getProductNameByIndex(1),
                await inventoryPage.getProductNameByIndex(2)
            ]
            console.log(expectedNames)

            await inventoryPage.addToCartByIndex(0)
            await inventoryPage.addToCartByIndex(1)
            await inventoryPage.addToCartByIndex(2)

            await cartPage.goto()
            const cartNames = await cartPage.getItemNames()

            expect(cartNames).toEqual(expect.arrayContaining(expectedNames))
            expect(cartNames.length).toBe(expectedNames.length)
        })

        test('TC-CART-05: ตรวจสอบราคาสินค้าตรงกับที่เลือก หรือไม่ ใน cart page ', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
    
            const expectedPrices = [
                await inventoryPage.getProductPriceByIndex(0),
                await inventoryPage.getProductPriceByIndex(1)
            ]

            await inventoryPage.addToCartByIndex(0)
            await inventoryPage.addToCartByIndex(1)

            await cartPage.goto()
            const cartPrices = await cartPage.getItemPrices()

            expect(cartPrices).toEqual(expect.arrayContaining(expectedPrices))
        })

        test('TC-CART-06: ', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
    
            // Collect expected data
            const expectedItems = [
                {
                    name: await inventoryPage.getProductNameByIndex(0),
                    price: await inventoryPage.getProductPriceByIndex(0)
                },
                {
                    name: await inventoryPage.getProductNameByIndex(2),
                    price: await inventoryPage.getProductPriceByIndex(2)
                }
            ]

            // Add items
            await inventoryPage.addToCartByIndex(0)
            await inventoryPage.addToCartByIndex(2)


            // Verify in cart
            await cartPage.goto()
            const isMatch = await cartPage.verifyItemsMatchInventory(expectedItems)

            expect(isMatch).toBeTruthy()
        })

    })

    test.describe('TC-CART-07: Quantity Management', () => {
        test('TC-CART-07: ปริมาณสินค้า ควรเริ่มต้นที่ 1 ', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
            await inventoryPage.addMultipleItemsToCart(3)

            await cartPage.goto()
    
            for (let i = 0; i < 3; i++) {
                const quantity = await cartPage.getItemQuantityByIndex(i)
                expect(quantity).toBe(1)
            }
        })
    })

    test.describe('TC-CART-08 - 10: Test Remove Items Functionality', () => {
        test('TC-CART-08: สามารถลบสินค้าได้', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
            await inventoryPage.addMultipleItemsToCart(3)

            await cartPage.goto()
            const initialCount = await cartPage.getCartItemCount()
    
            await cartPage.removeItemByIndex(0)
    
            const newCount = await cartPage.getCartItemCount()
            expect(newCount).toBe(initialCount - 1)
        })

        test('TC-CART-09: สามารถลบสินค้าทั้งหมดได้ โดยลบออกที่ละชิ้น', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
            await inventoryPage.addMultipleItemsToCart(4)

            await cartPage.goto()
            expect(await cartPage.getCartItemCount()).toBe(4)

            await cartPage.removeAllItems()
            expect(await cartPage.isCartEmpty()).toBeTruthy()
            expect(await cartPage.getCartItemCount()).toBe(0)
        })

        test('TC-CART-10: อัปเดต badge ถ้าลบสินค้า ', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
            await inventoryPage.addMultipleItemsToCart(3)

            await cartPage.goto()
            expect(await cartPage.doesBadgeMatchItemCount()).toBeTruthy()

            await cartPage.removeItemByIndex(0)
            expect(await cartPage.doesBadgeMatchItemCount()).toBeTruthy()
            expect(await cartPage.getCartBadgeCount()).toBe(2)
        })
    })

    test.describe('TC-CART-11 - 12: Test Continue Shopping Button', () => {
        test('TC-CART-11: กดปุ่ม continue shopping สามารถกลับไปยังหน้า inventory page', async ({ page, inventoryPage, cartPage }) => {
            await inventoryPage.goto()
            await inventoryPage.addToCartByIndex(0)
    
            await cartPage.goto()
            await cartPage.clickContinueShopping()

            await expect(page).toHaveURL(URLS.INVENTORY)
            expect(await inventoryPage.isOnInventoryPage()).toBeTruthy()
        })

        test('TC-CART-12: สินค้าในตะกร้ายังคงอยู่ ถ้ากดปุ่ม continue shopping ', async ({ inventoryPage, cartPage }) => {
            await inventoryPage.goto()
            await inventoryPage.addMultipleItemsToCart(2)

            await cartPage.goto()
            const itemCountBefore = await cartPage.getCartItemCount()
    
            await cartPage.clickContinueShopping()
    
            expect(await inventoryPage.getCartBadgeCount()).toBe(itemCountBefore)
        })
    })

    test.describe('TC-CART-13 - 14: Test Checkout Button', () => {
        test('TC-CART-13: ถ้ามีสินค้าในตะกร้า สามารถกดปุ่ม checkout ไปยังหน้า checkout page', async ({ page, inventoryPage, cartPage }) => {
            await inventoryPage.goto()
            await inventoryPage.addToCartByIndex(0)

            await cartPage.goto()
            await cartPage.clickCheckout()

            await expect(page).toHaveURL(URLS.CHECKOUT_STEP_ONE)
        })

        test('TC-CART-14: ถ้าไม่มีสินค้าในตะกร้า ไม่สามารถกดปุ่ม checkout ไปยังหน้า checkout page', async ({ page, cartPage }) => {
            await cartPage.goto()
    
            expect(await cartPage.isCartEmpty()).toBeTruthy()
            expect(await cartPage.isCheckoutButtonEnabled()).toBeTruthy()
    
            await cartPage.clickCheckout()
    

            await expect(page).toHaveURL(URLS.CART)
        })
    })

})