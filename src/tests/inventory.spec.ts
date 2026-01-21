import { test, expect } from '../fixtures/test.fixture'

import { selectOption } from '../data/inventory.data'

// test.describe('TC-INV-001: Test Inventory Page', () => {
//     test.beforeEach(async ({ loginPage }) => {
//         await loginPage.setUpValidLogin()
//     })

//     test('TC-INV-001: ', async ({ inventoryPage }) => {
//         await inventoryPage.sortBy(selectOption.az)
//         const productName = await inventoryPage.getProductName()
//         const expectedProductName = productName.sort((a, b) => a.localeCompare(b))
//         console.log('productName: ', productName)
//         console.log('expectedProductName: ', expectedProductName)
//         expect(productName).toEqual(expectedProductName)
//     })

//     test('TC-INV-002: ', async ({ inventoryPage }) => {
//         await inventoryPage.sortBy(selectOption.za)
//         const productName = await inventoryPage.getProductName()
//         const expectedProductName = productName.sort((a, b) => b.localeCompare(a))
//         console.log('productName: ', productName)
//         console.log('expectedProductName: ', expectedProductName)
//         expect(productName).toEqual(expectedProductName)
//     })

//     test('TC-INV-003: ', async ({ inventoryPage }) => {
//         await inventoryPage.sortBy(selectOption.lohi)
//         const productPrice = await inventoryPage.getProductsPrice()
//         const expectedProductPrice = productPrice.sort((a, b) => a - b)
//         console.log('productPrice: ', productPrice)
//         console.log('expectedProductPrice: ', expectedProductPrice)
//         expect(productPrice).toEqual(expectedProductPrice)
//     })

//     test('TC-INV-004: ', async ({ inventoryPage }) => {
//         await inventoryPage.sortBy(selectOption.hilo)
//         const productPrice = await inventoryPage.getProductsPrice()
//         const expectedProductPrice = productPrice.sort((a, b) => b - a)
//         console.log('productPrice: ', productPrice)
//         console.log('expectedProductPrice: ', expectedProductPrice)
//         expect(productPrice).toEqual(expectedProductPrice)
//     })

// })

test.describe('TC-INV-005: title ', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.setUpValidLogin()
    })

    test('TC-INV-005: ', async ({ inventoryPage, }) => {
        await inventoryPage.clickAllButtonsOneByOne()
    })

    test('TC-INV-006: ', async ({ inventoryPage }) => {
        await inventoryPage.clickAllButtonsOneByOne()
        await inventoryPage.clickRemoveAllButtonsOneByOne()
    })

    test('TC-INV-007: ', async ({ inventoryPage }) => {
        await inventoryPage.addAllItemsToCart()
        const finalCount = await inventoryPage.getCartCount()
        const totalItems = await inventoryPage.inventoryItems.count()
        expect(finalCount).toBe(totalItems)
    })

    test('TC-INV-008: ', async ({ inventoryPage }) => {
        await inventoryPage.addAllItemsToCart()
        expect(await inventoryPage.getCartCount()).toBe(6)

        await inventoryPage.removeAllItemsFromCart()
        expect(await inventoryPage.cartBadge).not.toBeVisible()
    })
})