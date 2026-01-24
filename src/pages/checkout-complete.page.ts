import { expect, type Locator, type Page } from '@playwright/test'

export class CheckoutCompletePage {
    readonly page: Page

    readonly checkoutCompleteContainer: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly ponyExpressImage: Locator;
    readonly backHomeButton: Locator;
    readonly cartBadge: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page

        this.checkoutCompleteContainer = page.locator('[data-test="checkout-complete-container"]')

        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.ponyExpressImage = page.locator('[data-test="pony-express"]');

        this.backHomeButton = page.locator('[data-test="back-to-products"]');

        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    }

    async goto() {
        await this.page.goto('/checkout-complete.html');
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }

    async clickCartIcon() {
        await this.cartIcon.click();
    }

    // Success Message Getters
    async getSuccessHeader(): Promise<string> {
        return await this.completeHeader.textContent() || '';
    }

    async getSuccessMessage(): Promise<string> {
        return await this.completeText.textContent() || '';
    }

    async getCompleteMessages(): Promise<{ header: string; text: string }> {
        return {
            header: await this.getSuccessHeader(),
            text: await this.getSuccessMessage()
        };
    }

    // Cart Badge Verification
    async getCartBadgeCount(): Promise<number> {
        const isVisible = await this.isCartBadgeVisible();
        if (!isVisible) return 0;
    
        try {
            const badgeText = await this.cartBadge.textContent();
            return parseInt(badgeText || '0');
        } catch {
            return 0;
        }
    }

    async isCartBadgeVisible(): Promise<boolean> {
    try {
      // Add a small timeout to ensure badge is removed
      await this.page.waitForTimeout(500);
      return await this.cartBadge.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
    }

    async isCartEmpty(): Promise<boolean> {
        return !(await this.isCartBadgeVisible());
    }

    // Verification Helpers
    async isOnCheckoutCompletePage(): Promise<boolean> {
        return await this.checkoutCompleteContainer.isVisible();
    }

    async isSuccessHeaderVisible(): Promise<boolean> {
        return await this.completeHeader.isVisible();
    }

    async isSuccessMessageVisible(): Promise<boolean> {
        return await this.completeText.isVisible();
    }

    async isSuccessImageVisible(): Promise<boolean> {
        return await this.ponyExpressImage.isVisible();
    }

    async isBackHomeButtonVisible(): Promise<boolean> {
        return await this.backHomeButton.isVisible();
    }

    async isBackHomeButtonEnabled(): Promise<boolean> {
        return await this.backHomeButton.isEnabled();
    }

    async waitForCompletePageToLoad() {
        await this.checkoutCompleteContainer.waitFor({ state: 'visible' });
        await this.completeHeader.waitFor({ state: 'visible' });
    }

    // Message Content Verification
    async hasSuccessMessage(): Promise<boolean> {
        const header = await this.getSuccessHeader();
        const text = await this.getSuccessMessage();
        return header.length > 0 && text.length > 0;
    }

        async containsThankYouMessage(): Promise<boolean> {
    const header = await this.getSuccessHeader();
    const text = await this.getSuccessMessage();
    
    // Check for common thank you phrases
    const thankYouPhrases = [
      'thank you',
      'thanks',
      'complete',
      'order',
      'dispatch',
      'successful'
    ];
    
    const combinedText = (header + ' ' + text).toLowerCase();
    return thankYouPhrases.some(phrase => combinedText.includes(phrase));
    }

    // Verify complete page elements
    async verifyCompletePage(): Promise<{
        headerVisible: boolean;
        messageVisible: boolean;
        imageVisible: boolean;
        buttonVisible: boolean;
        cartEmpty: boolean;
    }> {
        return {
            headerVisible: await this.isSuccessHeaderVisible(),
            messageVisible: await this.isSuccessMessageVisible(),
            imageVisible: await this.isSuccessImageVisible(),
            buttonVisible: await this.isBackHomeButtonVisible(),
            cartEmpty: await this.isCartEmpty()
        };
    }
}