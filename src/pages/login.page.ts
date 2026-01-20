import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {

    public readonly pageTitle: string;
    public readonly baseURL: string;
    public readonly urlAfterLogin: string;

    // Elementos
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;

    private readonly errorMessage: Locator;

    constructor(public readonly page: Page) {
        this.page = page;

        this.pageTitle = 'Swag Labs';
        this.baseURL = 'https://www.saucedemo.com';
        this.urlAfterLogin = `${this.baseURL}/inventory.html`

        this.usernameInput = this.page.locator('#user-name')
        this.passwordInput = this.page.locator('#password')
        this.loginButton = this.page.locator('#login-button')

        this.errorMessage = this.page.locator('h3[data-test="error"]')
    }

    async goto(): Promise<void> {
        await this.page.goto(this.baseURL)
        await expect(this.page).toHaveTitle(this.pageTitle)
    }

    async getUrl(): Promise<string> {
        return this.page.url()
    }

    async clickUsernameInput(): Promise<void> {
        await this.usernameInput.click()
    }

    async clickPasswordInput(): Promise<void> {
        await this.passwordInput.click()
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click()
    }

    async fillUsernameInput(username: string): Promise<void> {
        await this.usernameInput.fill(username)
        await expect(this.usernameInput).toHaveAttribute('type', 'text')
        expect(await this.usernameInput.inputValue()).toBe(username)
    }

    async fillPasswordInput(password: string): Promise<void> {
        await this.passwordInput.fill(password)
        await expect(this.passwordInput).toHaveAttribute('type', 'password')
        expect(await this.passwordInput.inputValue()).toBe(password)
    }

    async getErrorMessage(): Promise<string | null> {
        try {
            return this.errorMessage.textContent()
        } catch (error) {
            return null
        }
    }

    async isFoundErrorMessage(): Promise<boolean> {
        try {
            await this.errorMessage.waitFor({ state: 'visible' })
            return true
        } catch (error) {
            return false
        }
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillUsernameInput(username)
        await this.fillPasswordInput(password)
        await this.clickLoginButton()
        expect(await this.isFoundErrorMessage(), 'Error message not found').toBe(false)
    }
}