import { expect, type Locator, type Page } from '@playwright/test'

import { removeTrailingSlash } from '../utils/removeTrailingSlash'

import { loginData } from '../data/login.data'

export class LoginPage {

    public readonly webTitle: string
    private readonly logoWeb: string
    public readonly baseUrl: string
    public readonly urlAfterLogin: string


    private readonly usernameInput: Locator
    private readonly passwordInput: Locator

    private readonly loginButton: Locator

    private readonly errorMessage: string

    constructor(public readonly page: Page){
        this.webTitle = 'Swag Labs'
        this.logoWeb = '.login_logo'
        this.baseUrl = 'https://www.saucedemo.com'
        this.urlAfterLogin = `${this.baseUrl}/inventory.html`


        this.usernameInput = this.page.locator('#user-name')
        this.passwordInput = this.page.locator('#password')

        this.loginButton = this.page.locator('#login-button')

        this.errorMessage = '[data-test="error"]'
    }

    async goto(): Promise<void> {
        await this.page.goto(this.baseUrl)
        // รอจนกว่า logo ของหน้า login ถูก load
        await this.page.waitForSelector(this.logoWeb, {state: 'visible'})
    }

    async getCurrentUrl(): Promise<string> {
        // ตัดส่วน / ที่อยู่ท้ายสุดของ url ปัจจุบัน
        return removeTrailingSlash(this.page.url())
    }

    async checkUrl(): Promise<string> {
        const currentUrl = await this.getCurrentUrl()
        console.log('currentUrl: ', currentUrl)
        return currentUrl
    }

    async clickUsernameInput(): Promise<void> {
        await this.usernameInput.click()
    }

    async clickPasswordInput(): Promise<void> {
        await this.passwordInput.click()
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username)
        // รอให้ input มีค่า และ เทียบค่า ถ้าไม่ตรงกันจะ throw error
        await expect(this.usernameInput).toHaveValue(username)
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password)
        // รอให้ input มีค่า และ เทียบค่า ถ้าไม่ตรงกันจะ throw error
        await expect(this.passwordInput).toHaveValue(password)
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click()
    }

    async getErrorMessage(): Promise<string> {
        try {
            const textMessage = await this.page.locator(this.errorMessage).textContent()
            return textMessage ? textMessage : ''
        } catch (error) {
            return ''
        }
    }

    async setUpValidLogin(): Promise<void> {
        const loginPage = new LoginPage(this.page)
        await loginPage.goto()
        await loginPage.fillUsername(loginData.valid.username)
        await loginPage.fillPassword(loginData.valid.password)
        await loginPage.clickLoginButton()
    }

}