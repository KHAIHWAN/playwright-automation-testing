import { expect, type Locator, type Page } from '@playwright/test'

export class CheckoutPage {
    readonly page: Page

    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCode: Locator

    readonly continueButton: Locator
    readonly finishButton: Locator

    constructor(page: Page) {
        this.page = page

        this.firstNameInput = page.locator('[data-test="firstName"]')
        this.lastNameInput = page.locator('[data-test="lastName"]')
        this.postalCode = page.locator('[data-test="postalCode"]')

        this.continueButton = page.locator('[data-test="continue"]')
        this.finishButton = page.locator('[data-test="finish"]')
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.postalCode.fill(postalCode)
        await this.continueButton.click()
    }

    async finishCheckout() {
        await this.finishButton.click()
    }
}