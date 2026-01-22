import { expect, type Locator, type Page } from '@playwright/test'

export class InventoryPage {
    readonly page: Page

    readonly dropDownSort: Locator

    readonly productItems: Locator
    readonly productItemName: Locator
    readonly productItemPrice: Locator

    readonly addToCartButton: Locator
    readonly removeToCartButton: Locator

    readonly cartButton: Locator
    readonly cartBadge: Locator

    constructor(page: Page) {
        this.page = page

        this.dropDownSort = page.locator('.product_sort_container')

        this.productItems = page.locator('[data-test="inventory-item"]')
        this.productItemName = page.locator('[data-test="inventory_item_name"]')
        this.productItemPrice = page.locator('[data-test="inventory_item_price"]')

        this.addToCartButton = page.locator('[data-test^="add-to-cart-"]')
        this.removeToCartButton = page.locator('[data-test^="remove-"]')

        this.cartButton = page.locator('[data-test="shopping_cart_container"]')
        this.cartBadge = page.locator('.shopping_cart_badge')
    }

    async waitForProducts(): Promise<void> {
        await this.productItems.first().waitFor({ state: 'visible', timeout: 5000 })
    }

    async sortBy(option: string): Promise<void> {
        await this.dropDownSort.selectOption(option)
    }

    async countProducts(): Promise<number> {
        return await this.productItems.count()
    }

    async getProductsName(): Promise<string[]> {
        return await this.productItemName.allTextContents()
    }

    async getProductsPrice(): Promise<string[]> {
        return await this.productItemPrice.allTextContents()
    }

    async addAllProductsToCart(): Promise<number> {
        const numberOfProducts = await this.countProducts()
        for (let i = 0; i < numberOfProducts; i++) {
            await this.addToCartButton.nth(0).click()
        }
        return numberOfProducts
    }

    async removeAllProductsFromCart(): Promise<void> {
        const numberOfProducts = await this.countProducts()
        for (let i = 0; i < numberOfProducts; i++) {
            await this.removeToCartButton.nth(0).click()
        }
    }

    async getCartBadgeCount(): Promise<string> {
        return await this.cartBadge.innerText()
    }
}