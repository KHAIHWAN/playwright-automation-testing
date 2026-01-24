import { test, expect } from '../fixtures/custom.fixtures'

import { VALID_USERS, INVALID_CREDENTIALS, SPECIAL_CHARACTERS, ERROR_MESSAGES, URLS } from '../data-test/login.data'

test.describe('Login Page', () => {
    test.use({
        storageState: {
            cookies: [],
            origins: []
        }
    }) // ไม่ใช้ authentication state

    test.describe('TC-LOGIN-01 - 07: Input Character Validation', () => {
        test.beforeEach(async ({ loginPage }) => {
            await loginPage.goto()
        })

        test('TC-LOGIN-01: ตรวจสอบว่าระบบรองรับตัวอักษรภาษาอังกฤษพิมพ์ใหญ่', async ({ loginPage }) => {
            await loginPage.fillUsername(SPECIAL_CHARACTERS.UPPERCASE)
            const value = await loginPage.getUsernameValue()
            expect(value).toBe(SPECIAL_CHARACTERS.UPPERCASE)
        })

        test('TC-LOGIN-02: ตรวจสอบว่าระบบรองรับตัวอักษรภาษาอังกฤษพิมพ์เล็ก', async ({ loginPage }) => {
            await loginPage.fillUsername(SPECIAL_CHARACTERS.LOWERCASE)
            const value = await loginPage.getUsernameValue()
            expect(value).toBe(SPECIAL_CHARACTERS.LOWERCASE)
        })

        test('TC-LOGIN-03: ตรวจสอบว่าระบบรองรับตัวเลข', async ({ loginPage }) => {
            await loginPage.fillUsername(SPECIAL_CHARACTERS.NUMBERS_ONLY)
            const value = await loginPage.getUsernameValue()
            expect(value).toBe(SPECIAL_CHARACTERS.NUMBERS_ONLY)
        })

        test('TC-LOGIN-04: ตรวจสอบว่าระบบรองรับตัวอักษรพิเศษภาษาอังกฤษ', async ({ loginPage }) => {
            await loginPage.fillUsername(SPECIAL_CHARACTERS.SYMBOLS)
            const value = await loginPage.getUsernameValue()
            expect(value).toBe(SPECIAL_CHARACTERS.SYMBOLS)
        })

        test('TC-LOGIN-05: ตรวจสอบว่าระบบรองรับตัวอักษรภาษาอังกฤษ พิมพ์(ใหญ่/เล็ก) และตัวเลข', async ({ loginPage }) => {
            await loginPage.fillUsername(SPECIAL_CHARACTERS.MIXED_CASE)
            const value = await loginPage.getUsernameValue()
            expect(value).toBe(SPECIAL_CHARACTERS.MIXED_CASE)
        })

        test('TC-LOGIN-06: ตรวจสอบว่าระบบรองรับตัวอักษรภาษาไทย', async ({ loginPage }) => {
            await loginPage.fillUsername(SPECIAL_CHARACTERS.THAI)
            const value = await loginPage.getUsernameValue()
            expect(value).toBe(SPECIAL_CHARACTERS.THAI)
        })

        test('TC-LOGIN-07: ตรวจสอบว่าระบบรองรับ Emoji', async ({ loginPage }) => {
            await loginPage.fillUsername(SPECIAL_CHARACTERS.EMOJI)
            const value = await loginPage.getUsernameValue()
            expect(value).toBe(SPECIAL_CHARACTERS.EMOJI)
        })
    })

    test.describe('TC-LOGIN-08 - 15: Authentication Scenarios', () => {
        test.beforeEach(async ({ loginPage }) => {
            await loginPage.goto()
        })

        test('TC-LOGIN-08: เข้าสู่ระบบสำเร็จเมื่อกรอก username และ password ที่ถูกต้อง  ', async ({ page, loginPage }) => {
            await loginPage.login(VALID_USERS.STANDARD.username, VALID_USERS.STANDARD.password)
            await expect(page).toHaveURL(URLS.INVENTORY)
        })

        test('TC-LOGIN-09: แสดง error เมื่อกรอก username ผิด แต่กรอก password ถูก ', async ({ loginPage }) => {
            await loginPage.login(INVALID_CREDENTIALS.WRONG_USERNAME.username, VALID_USERS.STANDARD.password)
            await loginPage.waitForErrorMessage()
            expect(await loginPage.isErrorVisible()).toBeTruthy()
            const errorMsg = await loginPage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS)
        })

        test('TC-LOGIN-10: แสดง error เมื่อกรอก username ถูก แต่กรอก password ผิด', async ({ loginPage }) => {
            await loginPage.login(VALID_USERS.STANDARD.username, INVALID_CREDENTIALS.WRONG_PASSWORD.password)
            await loginPage.waitForErrorMessage()
            expect(await loginPage.isErrorVisible()).toBeTruthy()
            const errorMsg = await loginPage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS)
        })

        test('TC-LOGIN-11: แสดง error เมื่อกรอก username และ password ผิด', async ({ loginPage }) => {
            await loginPage.login(INVALID_CREDENTIALS.BOTH_WRONG.username, INVALID_CREDENTIALS.BOTH_WRONG.password);
            await loginPage.waitForErrorMessage()
            expect(await loginPage.isErrorVisible()).toBeTruthy()
            const errorMsg = await loginPage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS)
        })

        test('TC-LOGIN-12: แสดง error เมื่อกรอกแค่ username ถูก แต่ไม่กรอก password', async ({ loginPage }) => {
            await loginPage.fillUsername(VALID_USERS.STANDARD.username)
            await loginPage.clickLogin()
            await loginPage.waitForErrorMessage()
            expect(await loginPage.isErrorVisible()).toBeTruthy()
            const errorMsg = await loginPage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES.PASSWORD_REQUIRED)
        })

        test('TC-LOGIN-13: แสดง error เมื่อกรอกแค่ password ถูก แต่ไม่กรอก username', async ({ loginPage }) => {
            await loginPage.fillPassword(VALID_USERS.STANDARD.password)
            await loginPage.clickLogin()
            await loginPage.waitForErrorMessage()
            expect(await loginPage.isErrorVisible()).toBeTruthy()
            const errorMsg = await loginPage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES.USERNAME_REQUIRED)
        })

        test('TC-LOGIN-14: แสดง error เมื่อไม่กรอกทั้ง username และ password', async ({ loginPage }) => {
            await loginPage.clickLogin()
            await loginPage.waitForErrorMessage()
            expect(await loginPage.isErrorVisible()).toBeTruthy()
            const errorMsg = await loginPage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES.USERNAME_REQUIRED)
        })

        test('TC-LOGIN-15: แสดงความแจ้งเตือน user ถูก lock แล้ว', async ({ loginPage }) => {
            await loginPage.login(VALID_USERS.LOCKED_OUT.username, VALID_USERS.LOCKED_OUT.password)
            await loginPage.waitForErrorMessage()
            expect(await loginPage.isErrorVisible()).toBeTruthy()
            const errorMsg = await loginPage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES.LOCKED_OUT)
        })
        
    })

    test.describe('TC-LOGIN-16 - 20: Keyboard Shortcuts', () => {
        test.beforeEach(async ({ loginPage }) => {
            await loginPage.goto()
        })

        test('TC-LOGIN-16: รองรับการใช้งานปุ่ม Tab และ Enter สำหรับเข้าสู่ระบบ', async ({ page, loginPage }) => {
            await loginPage.loginWithKeyboard(VALID_USERS.STANDARD.username, VALID_USERS.STANDARD.password)
            await expect(page).toHaveURL(URLS.INVENTORY)
        })

        test('TC-LOGIN-17: เมื่อกดปุ่ม Tab หลังกรอก username cursor ต้องไปอยู่ที่ช่องกรอก password', async ({ page, loginPage }) => {
            await loginPage.fillUsername(VALID_USERS.STANDARD.username)
            await loginPage.pressTabOnUsername()
    
            // ดูว่า cursor ย้ายไปที่ช่อง password หรือไม่
            const focusedElement = await page.locator(':focus')
            await expect(focusedElement).toHaveAttribute('data-test', 'password')
        })

        test('TC-LOGIN-18: เมื่อกรอก username และ password แล้วกดปุ่ม Enter สามารถเข้าสู่ระบบได้', async ({ page, loginPage }) => {
            await loginPage.fillUsername(VALID_USERS.STANDARD.username)
            await loginPage.fillPassword(VALID_USERS.STANDARD.password)
            await loginPage.pressEnterOnPassword()
            await expect(page).toHaveURL(URLS.INVENTORY)
        })

        test('TC-LOGIN-19: แสดงความแจ้งเตือน error เมื่อไม่ได้กรอก username password แล้วกดปุ่ม Enter จะไม่สามารถเข้าสู่ระบบได้', async ({ loginPage }) => {
            await loginPage.loginWithTabOnly()
            await loginPage.waitForErrorMessage()
            expect(await loginPage.isErrorVisible()).toBeTruthy()
            const errorMsg = await loginPage.getErrorMessage()
            expect(errorMsg).toContain(ERROR_MESSAGES.USERNAME_REQUIRED)
        })

        test('TC-LOGIN-20: สามารถกดปุ่ม Shift+Tab เพื่อย้อนกลับไปช่องกรอก username ได้', async ({ page, loginPage }) => {
            await loginPage.usernameInput.focus()
            await loginPage.pressTabOnUsername()
            await page.keyboard.press('Shift+Tab')
    
            const focusedElement = await page.locator(':focus')
            await expect(focusedElement).toHaveAttribute('data-test', 'username')
        })
    })

})