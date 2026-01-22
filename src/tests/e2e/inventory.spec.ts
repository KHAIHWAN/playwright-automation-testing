import { test, expect } from '../fixtures/baseTest'

import { selectOption } from '../../data-test/inventory.data'

test.describe('TC-INVENTORY-01 - 04: Test Sort Inventory', () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.waitForProducts()
    })

    test('TC-INVENTORY-01: แสดงชื่อสินค้าตาม sort A-Z', async ({ inventoryPage }) => {
        await inventoryPage.sortBy(selectOption.az)
        const arrayItems = await inventoryPage.getProductsName()
        const expectedItems = arrayItems.sort((a, b) => a.localeCompare(b))
        expect(arrayItems).toEqual(expectedItems)
    })

    test('TC-INVENTORY-02: แสดงชื่อสินค้าตาม sort Z-A', async ({ inventoryPage }) => {
        await inventoryPage.sortBy(selectOption.za)
        const arrayItems = await inventoryPage.getProductsName()
        const expectedItems = arrayItems.sort((a, b) => b.localeCompare(a))
        expect(arrayItems).toEqual(expectedItems)
    })
    
    test('TC-INVENTORY-03: แสดงราคาสินค้าตาม sort Low-High', async ({ inventoryPage }) => {
        await inventoryPage.sortBy(selectOption.lohi)
        const arrayItems = await inventoryPage.getProductsPrice()
        const expectedItems = arrayItems.sort((a, b) => a.localeCompare(b))
        expect(arrayItems).toEqual(expectedItems)
    })

    test('TC-INVENTORY-04: แสดงราคาสินค้าตาม sort High-Low', async ({ inventoryPage }) => {
        await inventoryPage.sortBy(selectOption.hilo)
        const arrayItems = await inventoryPage.getProductsPrice()
        const expectedItems = arrayItems.sort((a, b) => b.localeCompare(a))
        expect(arrayItems).toEqual(expectedItems)
    })


})

test.describe('TC-INVENTORY-05 - 08: Test Button Add To Cart/Remove To Cart', () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.waitForProducts()
    })

    test('TC-INVENTORY-05: กดปุ่ม Add To Cart ทุกสินค้า', async ({ inventoryPage }) => {
        const numberOfProducts = await inventoryPage.countProducts()
        await inventoryPage.addAllProductsToCart()
        await expect(inventoryPage.cartBadge).toHaveText(numberOfProducts.toString())
    })

    test('TC-INVENTORY-06: กดปุ่ม Remove To Cart ทุกสินค้า', async ({ inventoryPage }) => {
        await inventoryPage.addAllProductsToCart()
        await inventoryPage.removeAllProductsFromCart()
        await expect(inventoryPage.cartBadge).not.toBeVisible()
    })

    test('TC-INVENTORY-07: แสดงจำนวนสินค้าในตะกร้า ตรงกับจำนวนสินค้าที่เพิ่ม', async ({ inventoryPage }) => {
        await expect(inventoryPage.cartBadge).not.toBeVisible()

        const expectedCount = await inventoryPage.addAllProductsToCart()

        console.log(`Added ${expectedCount} items to cart`)
        
        await expect(inventoryPage.cartBadge).toHaveText(expectedCount.toString())

        await expect(inventoryPage.addToCartButton).toHaveCount(0)
    })

    test('TC-INVENTORY-08: แสดงจำนวนสินค้าในตะกร้า ตรงกับจำนวนสินค้าที่ลบ', async ({ inventoryPage }) => {
        const expectedCount = await inventoryPage.addAllProductsToCart()
        await expect(inventoryPage.cartBadge).toHaveText(expectedCount.toString())

        await inventoryPage.removeAllProductsFromCart()
        await expect(inventoryPage.cartBadge).not.toBeVisible()

        await expect(inventoryPage.removeToCartButton).toHaveCount(0)
    })

})