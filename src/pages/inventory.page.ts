import { expect, type Locator, type Page } from '@playwright/test'

export class InventoryPage {

    private readonly logoWeb: string
    public readonly baseUrl: string

    private readonly dropdownSort: Locator
    private readonly productNames: Locator
    private readonly productPrices: Locator

    readonly inventoryItems: Locator;

    public addToCartButtons: Locator
    private removeButtons: Locator

    cartBadge: Locator
    
    constructor(public readonly page: Page){
        this.logoWeb = '.app_logo'
        this.baseUrl = 'https://www.saucedemo.com/inventory.html'

        this.dropdownSort = page.locator('.product_sort_container');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');

        this.inventoryItems = page.locator('.inventory_item');

        this.addToCartButtons = page.locator(
            'button[data-test^="add-to-cart-"]'
        )
        this.removeButtons = page.locator(
            'button[data-test^="remove-"]'
        )

        this.cartBadge = page.locator('.shopping_cart_badge')
    }

    async goto(): Promise<void> {
        await this.page.goto(this.baseUrl)
        // รอจนกว่า logo ของหน้า login ถูก load
        await this.page.waitForSelector(this.logoWeb, {state: 'visible'})
    }

    async sortBy(option: string): Promise<void> {
        await this.dropdownSort.selectOption(option)
    }

    async getProductName(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async getProductsPrice(): Promise<number[]> {
        const priceString = await this.productPrices.allTextContents();
        return priceString.map(price => {
            const numericValue = price.replace(/[^0-9.]/g, '')
            return parseFloat(numericValue)
        });
    }

    async clickAllButtonsOneByOne(): Promise<void> {
        const initialCount = await this.addToCartButtons.count()
        
        for (let i = 0; i < initialCount; i++) {
            // เราเลือก .first() เสมอ เพราะเมื่อตัวแรกถูกกดจนกลายเป็น "Remove" 
            // ตัวถัดไปจะขยับขึ้นมาเป็น .first() แทนโดยอัตโนมัติ
            const button = this.addToCartButtons.first()

            await expect(button).toBeVisible()
            const dataTestValue = await button.getAttribute('data-test')
            //console.log(`Clicking button ${i + 1}: ${dataTestValue}`)

            await button.click()
            // รอให้ปุ่มนั้นเปลี่ยนสถานะเป็น Remove ก่อนจะไปรอบถัดไป (เพื่อความเสถียร)
            // โดยเช็คว่าจำนวนปุ่ม Add to cart ลดลงจริง
            await expect(this.addToCartButtons).toHaveCount(initialCount - (i + 1))
        }
    }

    async clickRemoveAllButtonsOneByOne(): Promise<void> {
        const initialCount = await this.removeButtons.count()
        
        for (let i = 0; i < initialCount; i++) {
            const button = this.removeButtons.first()

            await expect(button).toBeVisible()
            const dataTestValue = await button.getAttribute('data-test')
            // console.log(`Clicking button ${i + 1}: ${dataTestValue}`)

            await button.click()
            await expect(this.removeButtons).toHaveCount(initialCount - (i + 1))
        }
    }

    async addAllItemsToCart() {
        // 1. รอให้ Container ของสินค้าอย่างน้อยตัวแรกปรากฏขึ้นมาก่อน
        await this.inventoryItems.first().waitFor({ state: 'visible' });

        // 2. ดึงจำนวนสินค้า
        const count = await this.inventoryItems.count();
        console.log(`Found ${count} items to process.`);

        for (let i = 0; i < count; i++) {
            // 3. ระบุ Item Container ตัวที่ i
            const item = this.inventoryItems.nth(i);
            
            // 4. สร้าง Locator ของปุ่มภายใน Item นั้น 
            // และสั่งให้มันรอจนกว่าปุ่มนี้จะ Attached กับหน้าจอจริงๆ
            const addButton = item.locator('button[data-test^="add-to-cart"]');
            await addButton.waitFor({ state: 'attached' });

            // 5. ดึงค่า (คราวนี้จะไม่ Timeout เพราะเราสั่ง waitFor ด้านบนแล้ว)
            const dataTestValue = await addButton.getAttribute('data-test');
            console.log(`Step ${i + 1}: Clicking ${dataTestValue}`);

            // 6. คลิก และรอผลลัพธ์
            await addButton.click();
            
            // 7. Verify เพื่อหน่วงเวลาให้ DOM อัปเดตก่อนไปรอบถัดไป
            const expectedCount = (i + 1).toString();
            await expect(this.cartBadge).toHaveText(expectedCount);
        }
    }

    async removeAllItemsFromCart() {
        // 1. ตรวจสอบก่อนว่ามีของในตะกร้ากี่ชิ้นจาก Badge
        const initialCount = await this.getCartCount();
        console.log(`Starting to remove ${initialCount} items...`);

        for (let i = initialCount; i > 0; i--) {
            // 2. ระบุ Item ที่มีปุ่ม Remove (เราจะกดจากอันแรกที่เจอไปเรื่อยๆ จนกว่าจะหมด)
            const removeButton = this.page.locator('button[data-test^="remove-"]').first();
            
            // 3. รอและเก็บชื่อไว้ก่อนกด (เพื่อป้องกัน Timeout เหมือนเดิม)
            await removeButton.waitFor({ state: 'attached' });
            const dataTestValue = await removeButton.getAttribute('data-test');
            console.log(`Removing: ${dataTestValue}`);

            // 4. คลิกปุ่ม Remove
            await removeButton.click();

            // 5. ตรวจสอบจำนวน Badge ที่ต้องลดลง
            if (i > 1) {
            const expectedCount = (i - 1).toString();
            await expect(this.cartBadge).toHaveText(expectedCount);
            } else {
            // 6. ถ้าลบจนเหลือ 0 ตัว Badge ต้องหายไปจาก DOM
            await expect(this.cartBadge).not.toBeVisible();
            }
        }
        console.log('All items removed successfully.');
    }

    async getCartCount(): Promise<number> {
        if (await this.cartBadge.isVisible()) {
            const count = await this.cartBadge.innerText()
            return parseInt(count)
        }
        return 0
    }
}