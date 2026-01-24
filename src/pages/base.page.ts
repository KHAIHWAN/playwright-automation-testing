import { expect, type Locator, type Page } from '@playwright/test'

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Helper method: รอให้ element แสดงก่อน แล้วค่อย click
    async clickElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' })
        await locator.click()
    }

    // Helper method: รอให้ page load เสร็จ
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle')
    }

    // Helper method: รอ element แสดงก่อน แล้วค่อย return text content
    async getTextContent(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible' })
        return (
            await locator.textContent()
        ) || ''
    }

    // Helper method: รอให้ url เปลี่ยนแปลง
    async waitForUrl(url: string) {
        await this.page.waitForURL(url)
    }
}