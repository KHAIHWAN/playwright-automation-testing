import { test, expect } from '../fixtures/test.fixture'

import { characterData, loginData, errorMessageData } from '../data/login.data'

test.describe('LOGIN PAGE', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
        expect.soft(loginPage.page.url()).toBe(loginPage.baseURL)
    })

    // TC-LOGIN-001 - TC-LOGIN-005: Test Input Character Validation
    test('TC-LOGIN-001: ตรวจสอบการพิมพ์ตัวอักษรภาษาอังกฤษตัวใหญ่ ทั้ง username และ password', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(characterData.upperCase)
        await loginPage.fillPasswordInput(characterData.upperCase)
    })
    
    test('TC-LOGIN-002: ตรวจสอบการพิมพ์ตัวอักษรภาษาอังกฤษตัวเล็ก ทั้ง username และ password', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(characterData.lowerCase)
        await loginPage.fillPasswordInput(characterData.lowerCase)
    })
    
    test('TC-LOGIN-003: ตรวจสอบการพิมพ์ตัวเลข ทั้ง username และ password', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(characterData.numbers)
        await loginPage.fillPasswordInput(characterData.numbers)
    })

    test('TC-LOGIN-004: ตรวจสอบการพิมพ์ตัวอักษรพิเศษ ทั้ง username และ password', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(characterData.specialCharacters)
        await loginPage.fillPasswordInput(characterData.specialCharacters)
    })

    test('TC-LOGIN-005: ตรวจสอบการพิมพ์ตัวอักษรแบบผสม ทั้ง username และ password', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(characterData.mixed)
        await loginPage.fillPasswordInput(characterData.mixed)
    })
    

    // TC-LOGIN-006 - TC-LOGIN-012: Test Login
    test('TC-LOGIN-006: ไม่พิมพ์ทั้ง username และ password', async ({ loginPage }) => {
        await loginPage.clickLoginButton()
        await expect(loginPage.getErrorMessage()).toBe(errorMessageData.errorUsername)
    })
    
    test('TC-LOGIN-007: พิมพ์แค่ username ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(loginData.valid.username)
        await loginPage.clickLoginButton()
        await expect(loginPage.getErrorMessage()).toBe(errorMessageData.errorPassword)
    })

    test('TC-LOGIN-008: พิมพ์แค่ password ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.fillPasswordInput(loginData.valid.password)
        await loginPage.clickLoginButton()
        await expect(loginPage.getErrorMessage()).toBe(errorMessageData.errorUsername)
    })
    
    test('TC-LOGIN-009: พิมพ์ username ถูกต้อง แต่ password ผิด', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(loginData.valid.username)
        await loginPage.fillPasswordInput(loginData.invalid.password)
        await loginPage.clickLoginButton()
        await expect(loginPage.getErrorMessage()).toBe(errorMessageData.errorInvalid)
    })

    test('TC-LOGIN-010: พิมพ์ password ถูกต้อง แต่ username ผิด', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(loginData.invalid.username)
        await loginPage.fillPasswordInput(loginData.valid.password)
        await loginPage.clickLoginButton()
        await expect(loginPage.getErrorMessage()).toBe(errorMessageData.errorInvalid)
    })

    test('TC-LOGIN-011: พิมพ์ username และ password ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.login(loginData.valid.username, loginData.valid.password)
        await expect(loginPage.getUrl()).toBe(loginPage.urlAfterLogin)
    })
    
    test('TC-LOGIN-012: พิมพ์ username และ password ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.login(loginData.invalid.username, loginData.invalid.password)
        await expect(loginPage.getErrorMessage()).toBe(errorMessageData.errorInvalid)
    })
    
    // TC-LOGIN-013 - TC-LOGIN-014: Test Shortcuts
    test('TC-LOGIN-013: กดปุ่ม Tab บน keyboard เลื่อนตามลำดับ username, password, login button', async ({ loginPage }) => {
        await loginPage.clickUsernameInput()

        for (let i = 0; i < 3 ;i++) {
            await loginPage.page.keyboard.press('Tab')
        }

        await loginPage.clickLoginButton()
    })

    test('TC-LOGIN-014: กดปุ่ม Enter หลังจากพิมพ์ username และ password ', async ({ loginPage }) => {
        await loginPage.fillUsernameInput(loginData.valid.username)
        await loginPage.fillPasswordInput(loginData.valid.password)
        await loginPage.page.keyboard.press('Enter')
        await expect(loginPage.getUrl()).toBe(loginPage.urlAfterLogin)
    })

})