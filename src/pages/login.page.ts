import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {

    private readonly usernameInput: Locator
    private readonly passwordInput: Locator

    private readonly loginButton: Locator

    private readonly errorMessage: Locator

    readonly urlBeforeLogin: string
    readonly urlAfterLogin: string

    constructor(public readonly page: Page) {
        this.usernameInput = page.locator('#user-name')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('#login-button')
        this.errorMessage = page.locator('[data-test="error"]')

        this.urlBeforeLogin = 'https://www.saucedemo.com'
        this.urlAfterLogin = 'https://www.saucedemo.com/inventory.html'
    }
    
    async goto() {
        await this.page.goto(this.urlBeforeLogin)
    }

    async fillInputText(inputText: string) {
        await this.usernameInput.fill(inputText)
        await this.passwordInput.fill(inputText)

        if (this.passwordInput) {
            expect(this.passwordInput).toHaveAttribute('type', 'password')
            console.log('Password input is hidden')
        } else {
            console.log('Password input is not hidden')
        }
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async getErrorMessage() {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 3000 })
        return await this.errorMessage.textContent()
    }

    async clickInputTextUsername() {
        await this.usernameInput.click()
    }

    async clickInputTextPassword() {
        await this.passwordInput.click()
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async checkUrlBeforeLogin() {
        await this.page.waitForURL(this.urlBeforeLogin)
    }

    async checkUrlAfterLogin() {
        await this.page.waitForURL(this.urlAfterLogin)
    }
}