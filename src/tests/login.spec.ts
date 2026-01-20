import { test, expect } from '../fixtures/test.fixture'

import { characterData, errorMessageData, loginData } from '../data/login.data'

test.describe('TC-LOGIN-001 - 005: Test Input Charcater Validation', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
        await loginPage.checkUrl()
    })

    test('TC-LOGIN-001: รองรับตัวพิมพ์ใหญ่ (Username/Password)', async ({ loginPage }) => {
        await loginPage.fillUsername(characterData.upperCase)
        await loginPage.fillPassword(characterData.upperCase)
    })

    test('TC-LOGIN-002: รองรับตัวพิมพ์เล็ก (Username/Password)', async ({ loginPage }) => {
        await loginPage.fillUsername(characterData.lowerCase)
        await loginPage.fillPassword(characterData.lowerCase)
    })

    test('TC-LOGIN-003: รองรับตัวเลข (Username/Password)', async ({ loginPage }) => {
        await loginPage.fillUsername(characterData.numbers)
        await loginPage.fillPassword(characterData.numbers)
    })

    test('TC-LOGIN-004: รองรับตัวอักษรพิเศษ (Username/Password)', async ({ loginPage }) => {
        await loginPage.fillUsername(characterData.specialCharacters)
        await loginPage.fillPassword(characterData.specialCharacters)
    })

    test('TC-LOGIN-005: รองรับตัวอักษรผสม (Username/Password)', async ({ loginPage }) => {
        await loginPage.fillUsername(characterData.mixed)
        await loginPage.fillPassword(characterData.mixed)
    })
})

test.describe('TC-LOGIN-006 - 014: Test Login Authentication Scenarios', () => {
    
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
        await loginPage.checkUrl()
    })

    test('TC-LOGIN-006: Login โดยไม่กรอก username และ password', async ({ loginPage }) => {
        await loginPage.fillUsername('')
        await loginPage.fillPassword('')
        await loginPage.clickLoginButton()
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorUsername)
    })

    test('TC-LOGIN-007: Login โดยกรอกแค่ username ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.fillUsername(loginData.valid.username)
        await loginPage.fillPassword('')
        await loginPage.clickLoginButton()
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorPassword)
    })
    
    test('TC-LOGIN-008: Login โดยกรอกแค่ password ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.fillUsername('')
        await loginPage.fillPassword(loginData.valid.password)
        await loginPage.clickLoginButton()
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorUsername)
    })

    test('TC-LOGIN-009: Login โดยกรอกแค่ username ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.fillUsername(loginData.invalid.username)
        await loginPage.fillPassword('')
        await loginPage.clickLoginButton()
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorPassword)
    })
    
    test('TC-LOGIN-010: Login โดยกรอกแค่ password ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.fillUsername('')
        await loginPage.fillPassword(loginData.invalid.password)
        await loginPage.clickLoginButton()
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorUsername)
    })

    test('TC-LOGIN-011: Login โดยกรอก username และ password ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.fillUsername(loginData.invalid.username)
        await loginPage.fillPassword(loginData.invalid.password)
        await loginPage.clickLoginButton()
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorInvalid)
    })

    test('TC-LOGIN-012: Login โดยกรอก username ที่ถูกต้อง และ password ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.fillUsername(loginData.valid.username)
        await loginPage.fillPassword(loginData.invalid.password)
        await loginPage.clickLoginButton()
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorInvalid)
    })

    test('TC-LOGIN-013: Login โดยกรอก username ที่ไม่มีในระบบ และ password ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.fillUsername(loginData.invalid.username)
        await loginPage.fillPassword(loginData.valid.password)
        await loginPage.clickLoginButton()
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorInvalid)
    })

    test('TC-LOGIN-014: Login โดยกรอก username และ password ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.fillUsername(loginData.valid.username)
        await loginPage.fillPassword(loginData.valid.password)
        await loginPage.clickLoginButton()
        expect(await loginPage.checkUrl()).toBe(loginPage.urlAfterLogin)
    })

})

test.describe('TC-LOGIN-015 - 016: Test Login Authentication Scenarios', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
        await loginPage.checkUrl()
    })

    test('TC-LOGIN-015: กด Tab 2 ครั้ง ไล่ลำดับฟิลด์หน้า Login ตั้งแต่ username, password, login แล้วกด Enter โดยยังไม่ได้กรอก username และ password', async ({ loginPage }) => {
        await loginPage.clickUsernameInput()

        for (let i = 0; i < 2 ;i++) {
            await loginPage.page.keyboard.press('Tab')
        }

        await loginPage.page.keyboard.press('Enter')
        expect(await loginPage.getErrorMessage()).toBe(errorMessageData.errorUsername)
    })

    test('TC-LOGIN-016: กดปุ่ม Enter หลังจากกรอก username และ password', async ({ loginPage }) => {
        await loginPage.clickUsernameInput()
        await loginPage.fillUsername(loginData.valid.username)
        await loginPage.fillPassword(loginData.valid.password)
        await loginPage.page.keyboard.press('Enter')
        expect(await loginPage.checkUrl()).toBe(loginPage.urlAfterLogin)
    })
})