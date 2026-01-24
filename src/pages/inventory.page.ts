import { expect, type Locator, type Page } from '@playwright/test'

export enum SortOption {
    NAME_A_TO_Z = 'az',
    NAME_Z_TO_A = 'za',
    PRICE_LOW_TO_HIGH = 'lohi',
    PRICE_HIGH_TO_LOW = 'hilo'
}

export class InventoryPage {
    readonly page: Page

    readonly sortDropdown: Locator

    readonly inventoryContainer: Locator
    readonly inventoryItems: Locator

    readonly productNames: Locator
    readonly productPrices: Locator
    readonly productDescriptions: Locator

    readonly addToCartButtons: Locator
    readonly removeButtons: Locator

    readonly cartBadge: Locator
    readonly cartIcon: Locator

    constructor(page: Page) {
        this.page = page

        this.sortDropdown = page.locator('[data-test="product-sort-container"]')

        this.inventoryContainer = page.locator('[data-test="inventory-container"]')
        this.inventoryItems = page.locator('[data-test="inventory-item"]')

        this.productNames = page.locator('[data-test="inventory-item-name"]')
        this.productPrices = page.locator('[data-test="inventory-item-price"]')
        this.productDescriptions = page.locator('[data-test="inventory-item-desc"]')

        this.addToCartButtons = page.locator('button[id^="add-to-cart"]')
        this.removeButtons = page.locator('button[id^="remove"]')

        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]')
    }

    async goto() {
        await this.page.goto('/inventory.html')
    }

    async clickCartIcon() {
        await this.cartIcon.click()
    }

    // Sorting Actios
    async selectSortOption(option: SortOption) {
        await this.sortDropdown.selectOption(option)
    }

    async getCurrentSortOption(): Promise<string> {
        return await this.sortDropdown.inputValue()
    }

    // Product Information Getters
    async getProductNames(): Promise<string[]> {
        const names = await this.productNames.allTextContents()
        return names
    }

    async getProductPrices(): Promise<number[]> {
        const pricesText = await this.productPrices.allTextContents()
        return pricesText.map(price => 
            parseFloat(
                price.replace('$', '')
            )
        )
    }

    async getProductCount(): Promise<number> {
        return await this.inventoryItems.count()
    }

    async getProductNameByIndex(index: number): Promise<string> {
        return await this.productNames.nth(index).textContent() || ''
    }

    async getProductPriceByIndex(index: number): Promise<number> {
        const priceText = await this.productPrices.nth(index).textContent() || '0'
        return parseFloat(priceText.replace('$', ''))
    }

    // Add to Cart Actions
    async addToCartByIndex(index: number) {
        const targetProduct = this.inventoryItems.nth(index)
        await targetProduct.locator('button[id^="add-to-cart"]').click()
    }

    async addToCartByName(productName: string) {
        // Find product by name and click its add to cart button
        const productItem = this.inventoryItems.filter({ hasText: productName })
        await productItem.locator('button[id^="add-to-cart"]').click()
    }

    async addMultipleItemsToCart(count: number) {
        for (let i = 0; i < count; i++) {
            await this.addToCartByIndex(i)
        }
    }

    async addAllItemsToCart() {
        const count = await this.addToCartButtons.count()
        for (let i = 0; i < count; i++) {
            await this.addToCartButtons.nth(0).click()
        }
    }

    // Remove from Cart Actions
    async removeFromCartByIndex(index: number) {
        await this.removeButtons.nth(index).click()
    }

    async removeFromCartByName(productName: string) {
        const productItem = this.inventoryItems.filter({ hasText: productName })
        await productItem.locator('button[id^="remove"]').click()
    }

    async removeAllItemsFromCart() {
        const count = await this.removeButtons.count()
        for (let i = count - 1; i >= 0; i--) {
            await this.removeButtons.nth(i).click()
        }
    }

    // Button State Checks
    async isAddToCartButtonVisibleByIndex(index: number): Promise<boolean> {
        return await this.addToCartButtons.nth(index).isVisible()
    }

    async isRemoveButtonVisibleByIndex(index: number): Promise<boolean> {
        const removeBtn = this.removeButtons.nth(index)
        try {
            return await removeBtn.isVisible()
        } catch {
            return false
        }
    }

    async isAddToCartButtonVisibleByName(productName: string): Promise<boolean> {
        const productItem = this.inventoryItems.filter({ hasText: productName })
        const addBtn = productItem.locator('button[id^="add-to-cart"]')
        try {
            return await addBtn.isVisible()
        } catch {
            return false
        }
    }

    async isRemoveButtonVisibleByName(productName: string): Promise<boolean> {
        const productItem = this.inventoryItems.filter({ hasText: productName })
        const removeBtn = productItem.locator('button[id^="remove"]')
        try {
            return await removeBtn.isVisible()
        } catch {
            return false
        }
    }

    async getAddToCartButtonCount(): Promise<number> {
        return await this.addToCartButtons.count()
    }

    async getRemoveButtonCount(): Promise<number> {
        return await this.removeButtons.count()
    }

    // Cart Badge
    async getCartBadgeCount(): Promise<number> {
        const isVisible = await this.isCartBadgeVisible()
        if (!isVisible) {
            return 0
        }

        const badgeText = await this.cartBadge.textContent()
        return parseInt(badgeText || '0')
    }

    async isCartBadgeVisible(): Promise<boolean> {
        try {
            return await this.cartBadge.isVisible();
        } catch {
            return false;
        }
    }

    // Verification Helpers
    async waitForInventoryToLoad() {
        await this.inventoryContainer.waitFor({ state: 'visible' })
        await this.inventoryItems.first().waitFor({ state: 'visible' })
    }

    async isOnInventoryPage(): Promise<boolean> {
        return await this.inventoryContainer.isVisible()
    }

    // Sorting Verification Helpers
    async areProductNamesSortedAZ(): Promise<boolean> {
        const names = await this.getProductNames()
        const sorted = [...names].sort((a, b) => a.localeCompare(b))
        return JSON.stringify(names) === JSON.stringify(sorted)
    }

    async areProductNamesSortedZA(): Promise<boolean> {
        const names = await this.getProductNames()
        const sorted = [...names].sort((a, b) => b.localeCompare(a))
        return JSON.stringify(names) === JSON.stringify(sorted)
    }

    async areProductPricesSortedLowToHigh(): Promise<boolean> {
        const prices = await this.getProductPrices()
        const sorted = [...prices].sort((a, b) => a - b)
        return JSON.stringify(prices) === JSON.stringify(sorted)
    }

    async areProductPricesSortedHighToLow(): Promise<boolean> {
        const prices = await this.getProductPrices()
        const sorted = [...prices].sort((a, b) => b - a)
        return JSON.stringify(prices) === JSON.stringify(sorted)
    }

}