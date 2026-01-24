import { expect, type Locator, type Page } from '@playwright/test'

export interface CheckoutSummaryItem {
    name: string
    description: string
    price: number
    quantity: number
}

export interface CheckoutSummary {
    items: CheckoutSummaryItem[]
    subtotal: number
    tax: number
    total: number
}

export class CheckoutStepTwoPage {
    readonly page: Page
  
    readonly checkoutSummaryContainer: Locator

    readonly cartItems: Locator
    readonly cartItemNames: Locator
    readonly cartItemDescriptions: Locator
    readonly cartItemPrices: Locator
    readonly cartItemQuantities: Locator

    readonly summarySubtotal: Locator
    readonly summaryTax: Locator
    readonly summaryTotal: Locator

    readonly finishButton: Locator
    readonly cancelButton: Locator

    readonly cartBadge: Locator

    readonly paymentInfo: Locator
    readonly shippingInfo: Locator

    constructor(page: Page) {
        this.page = page
    
        this.checkoutSummaryContainer = page.locator('[data-test="checkout-summary-container"]')

        this.cartItems = page.locator('[data-test="inventory-item"]')
        this.cartItemNames = page.locator('[data-test="inventory-item-name"]')
        this.cartItemDescriptions = page.locator('[data-test="inventory-item-desc"]')
        this.cartItemPrices = page.locator('[data-test="inventory-item-price"]')
        this.cartItemQuantities = page.locator('[data-test="item-quantity"]')
    
        this.summarySubtotal = page.locator('[data-test="subtotal-label"]')
        this.summaryTax = page.locator('[data-test="tax-label"]')
        this.summaryTotal = page.locator('[data-test="total-label"]')
    
        this.finishButton = page.locator('[data-test="finish"]')
        this.cancelButton = page.locator('[data-test="cancel"]')
    
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
    
        this.paymentInfo = page.locator('[data-test="payment-info-value"]')
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]')
    }

    async goto() {
        await this.page.goto('/checkout-step-two.html')
    }

    async clickFinish() {
        await this.finishButton.click()
    }

    async clickCancel() {
        await this.cancelButton.click()
    }

    // Cart Items Information
    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count()
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

    async getItemQuantities(): Promise<number[]> {
        const quantitiesText = await this.cartItemQuantities.allTextContents()
        return quantitiesText.map(qty => parseInt(qty))
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

    async getItemQuantityByIndex(index: number): Promise<number> {
        const qtyText = await this.cartItemQuantities.nth(index).textContent() || '1'
        return parseInt(qtyText)
    }

    // Get complete cart items data
    async getCartItems(): Promise<CheckoutSummaryItem[]> {
        const count = await this.getCartItemCount()
        const items: CheckoutSummaryItem[] = []

        for (let i = 0; i < count; i++) {
            items.push({
                name: await this.getItemNameByIndex(i),
                description: await this.getItemDescriptionByIndex(i),
                price: await this.getItemPriceByIndex(i),
                quantity: await this.getItemQuantityByIndex(i)
            })
        }

        return items
    }

    // Summary Calculations
    async getSubtotal(): Promise<number> {
        const subtotalText = await this.summarySubtotal.textContent() || ''
        const match = subtotalText.match(/\$([0-9.]+)/)
        return match ? parseFloat(match[1]) : 0
    }

    async getTax(): Promise<number> {
        const taxText = await this.summaryTax.textContent() || ''
        const match = taxText.match(/\$([0-9.]+)/)
        return match ? parseFloat(match[1]) : 0
    }

    async getTotal(): Promise<number> {
        const totalText = await this.summaryTotal.textContent() || ''
        const match = totalText.match(/\$([0-9.]+)/)
        return match ? parseFloat(match[1]) : 0
    }

    async getSummary(): Promise<CheckoutSummary> {
        return {
            items: await this.getCartItems(),
            subtotal: await this.getSubtotal(),
            tax: await this.getTax(),
            total: await this.getTotal()
        }
    }

    // Cart Badge
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

    // Additional Information
    async getPaymentInfo(): Promise<string> {
        return await this.paymentInfo.textContent() || ''
    }

    async getShippingInfo(): Promise<string> {
        return await this.shippingInfo.textContent() || ''
    }

    // Verification Helpers
    async isOnCheckoutStepTwoPage(): Promise<boolean> {
        return await this.checkoutSummaryContainer.isVisible()
    }

    async isFinishButtonEnabled(): Promise<boolean> {
        return await this.finishButton.isEnabled()
    }

    async isFinishButtonVisible(): Promise<boolean> {
        return await this.finishButton.isVisible()
    }

    async isCancelButtonVisible(): Promise<boolean> {
        return await this.cancelButton.isVisible()
    }

    async waitForCheckoutSummaryToLoad() {
        await this.checkoutSummaryContainer.waitFor({ state: 'visible' })
    }

    // Calculation Verification
    async calculateExpectedSubtotal(): Promise<number> {
        const prices = await this.getItemPrices()
        const quantities = await this.getItemQuantities()
    
        let subtotal = 0
        for (let i = 0; i < prices.length; i++) {
            subtotal += prices[i] * quantities[i]
        }
    
        return parseFloat(subtotal.toFixed(2))
    }

    async calculateExpectedTax(taxRate: number = 0.08): Promise<number> {
        const subtotal = await this.calculateExpectedSubtotal()
        return parseFloat((subtotal * taxRate).toFixed(2))
    }

    async calculateExpectedTotal(taxRate: number = 0.08): Promise<number> {
        const subtotal = await this.calculateExpectedSubtotal()
        const tax = await this.calculateExpectedTax(taxRate)
        return parseFloat((subtotal + tax).toFixed(2))
    }

    async isTaxCalculationCorrect(taxRate: number = 0.08): Promise<boolean> {
        const displayedTax = await this.getTax()
        const expectedTax = await this.calculateExpectedTax(taxRate)
    
        return Math.abs(displayedTax - expectedTax) < 0.01
    }

    async isTotalCalculationCorrect(): Promise<boolean> {
        const displayedTotal = await this.getTotal()
        const displayedSubtotal = await this.getSubtotal()
        const displayedTax = await this.getTax()
    
        const calculatedTotal = parseFloat((displayedSubtotal + displayedTax).toFixed(2))
    
        return Math.abs(displayedTotal - calculatedTotal) < 0.01
    }

    async isSubtotalCorrect(): Promise<boolean> {
        const displayedSubtotal = await this.getSubtotal()
        const expectedSubtotal = await this.calculateExpectedSubtotal()
    
        return Math.abs(displayedSubtotal - expectedSubtotal) < 0.01
    }

    // Compare with previous cart items
    async verifyItemsMatchCart(expectedItems: { name: string, price: number }[]): Promise<boolean> {
        const summaryItems = await this.getCartItems()
    
        if (summaryItems.length !== expectedItems.length) {
            return false
        }

        for (const expected of expectedItems) {
            const found = summaryItems.find(item => 
                item.name === expected.name && item.price === expected.price
            )
            if (!found) {
                return false
            }
        }

        return true
    }

    async doesBadgeMatchItemCount(): Promise<boolean> {
        const itemCount = await this.getCartItemCount()
        const badgeCount = await this.getCartBadgeCount()
        return itemCount === badgeCount
    }
}