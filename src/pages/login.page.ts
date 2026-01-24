import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page

    readonly usernameInput: Locator
    readonly passwordInput: Locator

    readonly loginButton: Locator

    readonly errorMessage: Locator
    readonly errorButton: Locator

    constructor(page: Page) {
        this.page = page

        this.usernameInput = page.locator('[data-test="username"]')
        this.passwordInput = page.locator('[data-test="password"]')

        this.loginButton = page.locator('[data-test="login-button"]')

        this.errorMessage = page.locator('[data-test="error"]')
        this.errorButton = page.locator('[data-test="error-button"]')
    }

    async goto() {
        await this.page.goto('/')
    }

    // Actions - Individual
    async fillUsername(username: string) {
        await this.usernameInput.fill(username)
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password)
    }

    async clickLogin() {
        await this.loginButton.click()
    }

    async clearUsername() {
        await this.usernameInput.clear()
    }

    async clearPassword() {
        await this.passwordInput.clear()
    }

    async clearLogin() {
        await this.loginButton.clear()
    }

    // Actions - Keyboard
    async pressTabOnUsername() {
        await this.usernameInput.press('Tab')
    }

    async pressTabOnPassword() {
        await this.passwordInput.press('Tab')
    }

    async pressEnterOnUsername() {
        await this.usernameInput.press('Enter')
    }

    async pressEnterOnPassword() {
        await this.passwordInput.press('Enter')
    }

    // Actions - Combined
    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async loginWithKeyboard(username: string, password: string) {
        await this.fillUsername(username)
        await this.pressTabOnUsername()
        await this.fillPassword(password)
        await this.pressEnterOnPassword()
    }

    async loginWithTabOnly() {
        // Tab through fields without filling
        await this.usernameInput.focus()
        await this.pressTabOnUsername()
        await this.pressTabOnPassword()
        await this.page.keyboard.press('Enter')
    }

    // Getters
    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || ''
    }

    async getUsernameValue(): Promise<string> {
        return await this.usernameInput.inputValue() || ''
    }

    async getPasswordValue(): Promise<string> {
        return await this.passwordInput.inputValue() || ''
    }

    // Assertions helpers
    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible()
    }

    async isOnLoginPage(): Promise<boolean> {
        return await this.loginButton.isVisible()
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled()
    }

    async waitForErrorMessage() {
        await this.errorMessage.waitFor({ state: 'visible' })
    }
}