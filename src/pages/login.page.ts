import { expect, type Locator, type Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    readonly loginButton: Locator;

    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');

        this.loginButton = page.locator('#login-button');

        this.errorMessage = page.locator('[data-test="error"]');
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async fillTextUsername(text: string) {
        await this.usernameInput.fill(text);
        await expect(this.usernameInput).toHaveValue(text);
        const actualValue = await this.usernameInput.inputValue();
        expect(actualValue).toBe(text);
    }

    async fillTextPassword(text: string) {
        await this.passwordInput.fill(text);
        await expect(this.passwordInput).toHaveValue(text);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login( username?: string, password?: string) {
        if (username !== undefined) {
            await this.fillTextUsername(username);
        }
        if (password !== undefined) {
            await this.fillTextPassword(password);
        }
        await this.clickLoginButton();
    }

    async getErrorMessage() {
        return this.errorMessage.textContent();
    }
}