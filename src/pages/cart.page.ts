import { expect, type Locator, type Page } from '@playwright/test'

export interface CartItem {
    name: string
    description: string
    price: number
    quantity: number
}

export class CartPage {
    readonly page: Page

    readonly cartContainer: Locator
    readonly cartItems: Locator
    readonly cartItemNames: Locator
    readonly cartItemDescriptions: Locator
    readonly cartItemPrices: Locator
    readonly cartItemQuantities: Locator

    readonly removeButtons: Locator

    readonly cartBadge: Locator

    readonly continueShoppingButton: Locator

    readonly checkoutButton: Locator

    readonly emptyCartMessage: Locator


    constructor(page: Page) {
        this.page = page

        this.cartContainer = page.locator('[data-test="cart-contents-container"]')
        this.cartItems = page.locator('[data-test="inventory-item"]')
        this.cartItemNames = page.locator('[data-test="inventory-item-name"]')
        this.cartItemDescriptions = page.locator('[data-test="inventory-item-desc"]')
        this.cartItemPrices = page.locator('[data-test="inventory-item-price"]')
        this.cartItemQuantities = page.locator('[data-test="item-quantity"]')

        this.removeButtons = page.locator('button[id^="remove-"]')

        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')

        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]')

        this.checkoutButton = page.locator('[data-test="checkout"]')

        this.emptyCartMessage = page.locator('[data-test="empty-cart-message"]')

        this.emptyCartMessage = this.cartItems
    }

    async goto() {
        await this.page.goto('/cart.html')
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click()
    }

    async clickCheckout() {
        await this.checkoutButton.click()
    }

    // Cart Item Actions
    async removeItemByIndex(index: number) {
        await this.removeButtons.nth(index).click()
    }

    async removeItemByName(productName: string) {
        const cartItem = this.cartItems.filter({ hasText: productName })
        await cartItem.locator('button[id^="remove-"]').click()
    }

    async removeAllItems() {
        const count = await this.getCartItemCount()
        for (let i = count - 1; i >= 0; i--) {
            await this.removeItemByIndex(i)
        }
    }

    async getItemQuantityByIndex(index: number): Promise<number> {
        const quantityText = await this.cartItemQuantities.nth(index).textContent()
        return parseInt(quantityText || '1')
    }

    // Cart Information Getters
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count()
    }

    async getCartBadgeCount(): Promise<number> {
        const isVisible = await this.isCartBadgeVisible()
        if (!isVisible) return 0
    
        const badgeText = await this.cartBadge.textContent()
        return parseInt(badgeText || '0')
    }

    async isCartBadgeVisible(): Promise<boolean> {
        try {
            return await this.cartBadge.isVisible()
        } catch {
            return false
        }
    }

    async getItemNames(): Promise<string[]> {
        return await this.cartItemNames.allTextContents()
    }

    async getItemPrices(): Promise<number[]> {
        const pricesText = await this.cartItemPrices.allTextContents()
        return pricesText.map(price => parseFloat(price.replace('$', '')))
    }

    async getItemDescriptions(): Promise<string[]> {
        return await this.cartItemDescriptions.allTextContents()
    }

    async getItemNameByIndex(index: number): Promise<string> {
        return await this.cartItemNames.nth(index).textContent() || ''
    }

    async getItemPriceByIndex(index: number): Promise<number> {
        const priceText = await this.cartItemPrices.nth(index).textContent() || '0'
        return parseFloat(priceText.replace('$', ''))
    }

    async getItemDescriptionByIndex(index: number): Promise<string> {
        return await this.cartItemDescriptions.nth(index).textContent() || ''
    }

    // Get complete cart item data
    async getCartItems(): Promise<CartItem[]> {
        const count = await this.getCartItemCount()
        const items: CartItem[] = []

        for (let i = 0; i < count; i++) {
            items.push({
                name: await this.getItemNameByIndex(i),
                description: await this.getItemDescriptionByIndex(i),
                price: await this.getItemPriceByIndex(i),
                quantity: 1
            })
        }

        return items
    }

    async getTotalPrice(): Promise<number> {
        const prices = await this.getItemPrices()
        return prices.reduce((sum, price) => sum + price, 0)
    }

    // Verification Helpers
    async isCartEmpty(): Promise<boolean> {
        return (await this.getCartItemCount()) === 0
    }

    async isOnCartPage(): Promise<boolean> {
        return await this.cartContainer.isVisible()
    }

    async isCheckoutButtonEnabled(): Promise<boolean> {
        return await this.checkoutButton.isEnabled()
    }

    async isCheckoutButtonVisible(): Promise<boolean> {
        return await this.checkoutButton.isVisible()
    }

    async isContinueShoppingButtonVisible(): Promise<boolean> {
        return await this.continueShoppingButton.isVisible()
    }

    async isItemInCart(productName: string): Promise<boolean> {
        const names = await this.getItemNames()
        return names.includes(productName)
    }

    async waitForCartToLoad() {
        await this.cartContainer.waitFor({ state: 'visible' })
    }

    // Compare with inventory items (useful for validation)
    async verifyItemsMatchInventory(expectedItems: { name: string; price: number }[]): Promise<boolean> {
        const cartItems = await this.getCartItems()
    
        if (cartItems.length !== expectedItems.length) {
            return false
        }

        for (const expected of expectedItems) {
            const found = cartItems.find(item => item.name === expected.name && item.price === expected.price)
            if (!found) {
                return false
            }
        }

        return true
    }

    // Cart Badge Validation
    async doesBadgeMatchItemCount(): Promise<boolean> {
        const itemCount = await this.getCartItemCount()
        const badgeCount = await this.getCartBadgeCount()
        return itemCount === badgeCount
    }
}