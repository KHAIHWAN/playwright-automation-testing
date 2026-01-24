import { test, expect } from '../fixtures/custom.fixtures'

import { InventoryPage, SortOption } from '../pages/inventory.page'

test.describe('Inventory Page', () => {
    // ใช้ authentication state จาก config (login อัตโนมัติ)

    test.describe('TC-INVENTORY-01 - 05: Test Sort Inventory', () => {

        test.beforeEach(async ({ inventoryPage }) => {
            await inventoryPage.goto()
        })

        test('TC-INVENTORY-01: เรียงชื่อสินค้าตาม ตัวอักษร A-Z', async ({ inventoryPage }) => {
            await inventoryPage.selectSortOption(SortOption.NAME_A_TO_Z)

            // Check ว่า product name ถูก sort ตาม option ที่เลือก
            const isSorted = await inventoryPage.areProductNamesSortedAZ()
            expect(isSorted).toBeTruthy()

            // Check ว่า option ที่ถูกเลือก ตรงกับที่ต้องการหรือไม่
            const currentSort = await inventoryPage.getCurrentSortOption()
            expect(currentSort).toBe(SortOption.NAME_A_TO_Z)
        })

        test('TC-INVENTORY-02: เรียงชื่อสินค้าตาม ตัวอักษร Z-A', async ({ inventoryPage }) => {
            await inventoryPage.selectSortOption(SortOption.NAME_Z_TO_A)

            const isSorted = await inventoryPage.areProductNamesSortedZA()
            expect(isSorted).toBeTruthy()

            const currentSort = await inventoryPage.getCurrentSortOption()
            expect(currentSort).toBe(SortOption.NAME_Z_TO_A)
        })

        test('TC-INVENTORY-03: เรียงราคาสินค้าตามราคาต่ำสุด', async ({ inventoryPage }) => {
            await inventoryPage.selectSortOption(SortOption.PRICE_LOW_TO_HIGH)
    
            const isSorted = await inventoryPage.areProductPricesSortedLowToHigh()
            expect(isSorted).toBeTruthy()
    
            const currentSort = await inventoryPage.getCurrentSortOption()
            expect(currentSort).toBe(SortOption.PRICE_LOW_TO_HIGH);
        })

        test('TC-INVENTORY-04: เรียงราคาสินค้าตามราคาสูงสุด', async ({ inventoryPage }) => {
            await inventoryPage.selectSortOption(SortOption.PRICE_HIGH_TO_LOW)
    
            const isSorted = await inventoryPage.areProductPricesSortedHighToLow()
            expect(isSorted).toBeTruthy()
    
            const currentSort = await inventoryPage.getCurrentSortOption()
            expect(currentSort).toBe(SortOption.PRICE_HIGH_TO_LOW)
        })

        test('TC-INVENTORY-05: เมื่อเรียงสินค้าแล้ว และสลับ option การเรียงต้องเปลี่ยน', async ({ inventoryPage }) => {
            // เรียงตามชื่อ A-Z
            await inventoryPage.selectSortOption(SortOption.NAME_A_TO_Z)
            expect(await inventoryPage.areProductNamesSortedAZ()).toBeTruthy()

            // เรียงตามราคาต่ำสุด
            await inventoryPage.selectSortOption(SortOption.PRICE_LOW_TO_HIGH)
            expect(await inventoryPage.areProductPricesSortedLowToHigh()).toBeTruthy()

            // เรียงตามชื่อ Z-A
            await inventoryPage.selectSortOption(SortOption.NAME_Z_TO_A)
            expect(await inventoryPage.areProductNamesSortedZA()).toBeTruthy()
        })
    })

    test.describe('TC-INVENTORY-06 - 09: Test Add/Remove Button Functionality', () => {
        
        test.beforeEach(async ({ inventoryPage }) => {
            await inventoryPage.goto()
        })

        test('TC-INVENTORY-06: แสดงปุ่ม Add to Cart ทุกสินค้า', async ({ inventoryPage }) => {
            const count = await inventoryPage.getProductCount()
    
            for (let i = 0; i < count; i++) {
                expect(await inventoryPage.isAddToCartButtonVisibleByIndex(i)).toBeTruthy()
            }
        })

        test('TC-INVENTORY-07: แสดงปุ่ม Remove หลังจาก กดปุ่ม Add to Cart', async ({ inventoryPage }) => {
            // เลือกสินค้าอันแรก
            const index = 0
    
            // ต้องแสดงปุ่ม Add to Cart ก่อน
            expect(await inventoryPage.isAddToCartButtonVisibleByIndex(index)).toBeTruthy()
    
            // กดปุ่ม Add to Cart
            await inventoryPage.addToCartByIndex(index)
    
            // ต้องแสดงปุ่ม Remove หลังจาก กดปุ่ม Add to Cart
            expect(await inventoryPage.isRemoveButtonVisibleByIndex(index)).toBeTruthy()
        })

        test('TC-INVENTORY-08: แสดงปุ่ม Add to Cart หลังจาก กดปุ่ม Remove', async ({ inventoryPage }) => {
            // เลือกสินค้าอันแรก
            const index = 0
    
            // กดปุ่ม Add to Cart
            await inventoryPage.addToCartByIndex(index)
            expect(await inventoryPage.isRemoveButtonVisibleByIndex(index)).toBeTruthy()
    
            // กดปุ่ม Remove
            await inventoryPage.removeFromCartByIndex(index)
    
            // ต้องแสดงปุ่ม Add to Cart หลังจาก กดปุ่ม Remove
            expect(await inventoryPage.isAddToCartButtonVisibleByIndex(index)).toBeTruthy()
        })

        test('TC-INVENTORY-09: กดปุ่ม Add to Cart แล้วกดปุ่ม Remove สลับกัน 2 ครั้ง', async ({ inventoryPage }) => {
            // เลือกสินค้าอันแรก
            const index = 0;
    
            // กดปุ่ม Add to Cart ครั้งที่ 1
            await inventoryPage.addToCartByIndex(index)
            expect(await inventoryPage.isRemoveButtonVisibleByIndex(index)).toBeTruthy()
    
            // กดปุ่ม Remove ครั้งที่ 1
            await inventoryPage.removeFromCartByIndex(index)
            expect(await inventoryPage.isAddToCartButtonVisibleByIndex(index)).toBeTruthy()
    
            // กดปุ่ม Add to Cart ครั้งที่ 2
            await inventoryPage.addToCartByIndex(index)
            expect(await inventoryPage.isRemoveButtonVisibleByIndex(index)).toBeTruthy()
    
            // กดปุ่ม Remove ครั้งที่ 2
            await inventoryPage.removeFromCartByIndex(index)
            expect(await inventoryPage.isAddToCartButtonVisibleByIndex(index)).toBeTruthy()
        })

    })

    test.describe('TC-INVENTORY-10 - 20: ', () => {
        test.beforeEach(async ({ inventoryPage }) => {
            await inventoryPage.goto()
        })

        test('TC-INVENTORY-10: ไม่แสดง badge เมื่อไม่เพิ่มสินค้า ', async ({ inventoryPage }) => {
            expect(await inventoryPage.isCartBadgeVisible()).toBeFalsy()
        })

        test('TC-INVENTORY-11: เมื่อเพิ่มสินค้า 1 ชิ้น ต้องแสดง badge ตามสินค้า ', async ({ inventoryPage }) => {
            await inventoryPage.addToCartByIndex(0)
    
            expect(await inventoryPage.isCartBadgeVisible()).toBeTruthy()
            expect(await inventoryPage.getCartBadgeCount()).toBe(1)
        })

        test('TC-INVENTORY-12: เมื่อเพิ่มสินค้า 3 ชิ้น ต้องแสดง badge ตามสินค้า ', async ({ inventoryPage }) => {
            // Add 3 items
            await inventoryPage.addToCartByIndex(0);
            expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    
            await inventoryPage.addToCartByIndex(1);
            expect(await inventoryPage.getCartBadgeCount()).toBe(2);
    
            await inventoryPage.addToCartByIndex(2);
            expect(await inventoryPage.getCartBadgeCount()).toBe(3);
        })

        test('TC-INVENTORY-13: เมื่อเพิ่มสินค้า 3 ชิ้น แล้วลบสินค้า 2 ชิ้น ต้องแสดง badge ตามสินค้า ', async ({ inventoryPage }) => {
            // เพิ่มสินค้า 3 ชิ้น
            await inventoryPage.addMultipleItemsToCart(3);
            expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    
            // ลบสินค้า 1 ชิ้น
            await inventoryPage.removeFromCartByIndex(0);
            expect(await inventoryPage.getCartBadgeCount()).toBe(2);
    
            // ลบสินค้าอีก 1 ชิ้น
            await inventoryPage.removeFromCartByIndex(0);
            expect(await inventoryPage.getCartBadgeCount()).toBe(1);
        })

        test('TC-INVENTORY-14: เมื่อเพิ่มสินค้า 3 ชิ้น แล้วลบสินค้าทุกชิ้น ต้องไม่แสดง badge ', async ({ inventoryPage }) => {
            // เพิ่มสินค้า 3 ชิ้น
            await inventoryPage.addMultipleItemsToCart(3);
            expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    
            // ลบสินค้าทุกชิ้น
            await inventoryPage.removeAllItemsFromCart();
    
            // ต้องไม่แสดง badge
            expect(await inventoryPage.isCartBadgeVisible()).toBeFalsy();
            expect(await inventoryPage.getCartBadgeCount()).toBe(0);
        })

        test('TC-INVENTORY-15: กดเพิ่มสินค้าทุกสินค้า แล้วต้องแสดง badge ตามจำนวนสินค้า ', async ({ inventoryPage }) => {
            const totalProducts = await inventoryPage.getProductCount();
    
            await inventoryPage.addAllItemsToCart();
    
            expect(await inventoryPage.getCartBadgeCount()).toBe(totalProducts);
        })

        test('TC-INVENTORY-16: เพิ่มสินค้าแล้ว กดเรียงสินค้า ต้องแสดง badge ตามจำนวนสินค้าที่เพิ่มเข้าไป ', async ({ inventoryPage }) => {
            // เพิ่มสินค้า 3 ชิ้น
            await inventoryPage.addMultipleItemsToCart(3);
            expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    
            // เปลี่ยน option เรียง ชื่อ Z-A
            await inventoryPage.selectSortOption(SortOption.NAME_Z_TO_A);
    
            // ต้องแสดง badge ตามจำนวนสินค้าที่เพิ่มเข้าไป
            expect(await inventoryPage.getCartBadgeCount()).toBe(3);
        })
           
    })

})