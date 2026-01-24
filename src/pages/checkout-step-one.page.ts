import { expect, type Locator, type Page } from '@playwright/test'

export interface CheckoutInfo {
  firstName: string
  lastName: string
  zipCode: string
}

export class CheckoutStepOnePage {
    readonly page: Page
  
    readonly checkoutContainer: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly zipCodeInput: Locator
    readonly continueButton: Locator
    readonly cancelButton: Locator
    readonly errorMessage: Locator
    readonly errorButton: Locator
    readonly cartBadge: Locator

    constructor(page: Page) {
        this.page = page
    
        this.checkoutContainer = page.locator('[data-test="checkout-info-container"]')
        this.firstNameInput = page.locator('[data-test="firstName"]')
        this.lastNameInput = page.locator('[data-test="lastName"]')
        this.zipCodeInput = page.locator('[data-test="postalCode"]')
        this.continueButton = page.locator('[data-test="continue"]')
        this.cancelButton = page.locator('[data-test="cancel"]')
        this.errorMessage = page.locator('[data-test="error"]')
        this.errorButton = page.locator('[data-test="error-button"]')
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')
    }

    async goto() {
        await this.page.goto('/checkout-step-one.html')
    }

    async clickContinue() {
        await this.continueButton.click()
    }

    async clickCancel() {
        await this.cancelButton.click()
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName)
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName)
    }

    async fillZipCode(zipCode: string) {
        await this.zipCodeInput.fill(zipCode)
    }

    async clearFirstName() {
        await this.firstNameInput.clear()
    }

    async clearLastName() {
        await this.lastNameInput.clear()
    }

    async clearZipCode() {
        await this.zipCodeInput.clear()
    }

    async clearAllFields() {
        await this.clearFirstName()
        await this.clearLastName()
        await this.clearZipCode()
    }

    // Form Input Actions - Combined
    async fillCheckoutInfo(info: CheckoutInfo) {
        await this.fillFirstName(info.firstName)
        await this.fillLastName(info.lastName)
        await this.fillZipCode(info.zipCode)
    }

    async fillAndContinue(info: CheckoutInfo) {
        await this.fillCheckoutInfo(info)
        await this.clickContinue()
    }

    // Keyboard Actions
    async pressTabOnFirstName() {
        await this.firstNameInput.press('Tab')
    }

    async pressTabOnLastName() {
        await this.lastNameInput.press('Tab')
    }

    async pressTabOnZipCode() {
        await this.zipCodeInput.press('Tab')
    }

    async pressEnterOnZipCode() {
        await this.zipCodeInput.press('Enter')
    }

    async pressEnterOnFirstName() {
        await this.firstNameInput.press('Enter')
    }

    async pressEnterOnLastName() {
        await this.lastNameInput.press('Enter')
    }

    // Keyboard Navigation - Fill with Tab
    async fillWithKeyboardNavigation(info: CheckoutInfo) {
        await this.fillFirstName(info.firstName)
        await this.pressTabOnFirstName()
        await this.fillLastName(info.lastName)
        await this.pressTabOnLastName()
        await this.fillZipCode(info.zipCode)
        await this.pressEnterOnZipCode()
    }

    // Getters - Form Values
    async getFirstNameValue(): Promise<string> {
        return await this.firstNameInput.inputValue()
    }

    async getLastNameValue(): Promise<string> {
        return await this.lastNameInput.inputValue()
    }

    async getZipCodeValue(): Promise<string> {
        return await this.zipCodeInput.inputValue()
    }

    async getCheckoutInfo(): Promise<CheckoutInfo> {
        return {
            firstName: await this.getFirstNameValue(),
            lastName: await this.getLastNameValue(),
            zipCode: await this.getZipCodeValue()
        }
    }

    // Error Handling
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || ''
    }

    async isErrorVisible(): Promise<boolean> {
        try {
            return await this.errorMessage.isVisible()
        } catch {
            return false
        }
    }

    async closeError() {
        await this.errorButton.click()
    }

    async waitForErrorMessage() {
        await this.errorMessage.waitFor({ state: 'visible' })
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

    // Verification Helpers
    async isOnCheckoutStepOnePage(): Promise<boolean> {
        return await this.checkoutContainer.isVisible()
    }

    async isContinueButtonEnabled(): Promise<boolean> {
        return await this.continueButton.isEnabled()
    }

    async isCancelButtonVisible(): Promise<boolean> {
        return await this.cancelButton.isVisible()
    }

    async areAllFieldsEmpty(): Promise<boolean> {
        const firstName = await this.getFirstNameValue()
        const lastName = await this.getLastNameValue()
        const zipCode = await this.getZipCodeValue()
    
        return firstName === '' && lastName === '' && zipCode === ''
    }

    async isFormComplete(): Promise<boolean> {
        const firstName = await this.getFirstNameValue()
        const lastName = await this.getLastNameValue()
        const zipCode = await this.getZipCodeValue()
    
        return firstName !== '' && lastName !== '' && zipCode !== ''
    }

    async waitForCheckoutPageToLoad() {
        await this.checkoutContainer.waitFor({ state: 'visible' })
    }

    // Field Focus Helpers
    async focusFirstName() {
        await this.firstNameInput.focus()
    }

    async focusLastName() {
        await this.lastNameInput.focus()
    }

    async focusZipCode() {
        await this.zipCodeInput.focus()
    }

    // Placeholder/Label Verification
    async getFirstNamePlaceholder(): Promise<string> {
        return await this.firstNameInput.getAttribute('placeholder') || ''
    }

    async getLastNamePlaceholder(): Promise<string> {
        return await this.lastNameInput.getAttribute('placeholder') || ''
    }

    async getZipCodePlaceholder(): Promise<string> {
        return await this.zipCodeInput.getAttribute('placeholder') || ''
    }
}