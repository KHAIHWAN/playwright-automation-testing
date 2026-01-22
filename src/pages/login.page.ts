import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page

    readonly urlAfterLogin: string

    readonly logoWebSite: Locator

    readonly usernameInput: Locator
    readonly passwordInput: Locator

    readonly loginButton: Locator

    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page

        this.urlAfterLogin = '/inventory.html'

        this.logoWebSite = page.locator('css=login_logo')

        this.usernameInput = page.locator('[data-test="username"]')
        this.passwordInput = page.locator('[data-test="password"]')

        this.loginButton = page.locator('[data-test="login-button"]')

        this.errorMessage = page.locator('[data-test="error"]')
    }

    async goto(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'networkidle' })
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click()
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
    }

    async expectErrorMessage(message: string): Promise<void> {
        await expect(this.errorMessage).toHaveText(message)
    }

    async pressTabKey(): Promise<void> {
        await this.usernameInput.press('Tab')
    }

    async pressEnterKey(): Promise<void> {
        await this.usernameInput.press('Enter')
    }

    async checkTextInputSupportsAllCharacters(data: string): Promise<void> {
        await this.fillUsername(data)
        await this.fillPassword(data)
        await expect(this.usernameInput).toHaveValue(data)
        await expect(this.passwordInput).toHaveValue(data)
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickLogin()
    }

    async loginWithEnterKey(username: string, password: string): Promise<void> {
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.pressEnterKey()
    }

    async loginWithTabKey(username: string, password: string): Promise<void> {
        await this.fillUsername(username)
        await this.pressTabKey()
        await this.fillPassword(password)
        await this.pressTabKey()
        await this.pressEnterKey()
    }

}