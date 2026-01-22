import { test, expect } from '../fixtures/baseTest'

import { characterData, characterData2,  loginData, messageErrorData, scenariosDataLogin } from '../../data-test/login.data'

test.describe('TC-LOGIN-01 - 05: Test Input Character Validation', () => {

    // for (const { label, value} of characterData2) {
    //     test(`TC-LOGIN-01 - 05: Should support ${label}`, async ({ loginPage }) => {
    //         await loginPage.goto()
    //         await loginPage.checkTextInputSupportsAllCharacters(value)
    //     })
    // }

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
    })

    test('TC-LOGIN-01: รองรับตัวพิมพ์ใหญ่', async ({ loginPage }) => {
        await loginPage.checkTextInputSupportsAllCharacters(characterData.upperCase)
    })

    test('TC-LOGIN-02: รองรับตัวพิมพ์เล็ก', async ({ loginPage }) => {
        await loginPage.checkTextInputSupportsAllCharacters(characterData.lowerCase)
    })

    test('TC-LOGIN-03: รองรับตัวเลข', async ({ loginPage }) => {
        await loginPage.checkTextInputSupportsAllCharacters(characterData.numbers)
    })

    test('TC-LOGIN-04: รองรับตัวอักษรพิเศษ', async ({ loginPage }) => {
        await loginPage.checkTextInputSupportsAllCharacters(characterData.specialCharacters)
    })

    test('TC-LOGIN-05: รองรับตัวอักษรแบบผสม', async ({ loginPage }) => {
        await loginPage.checkTextInputSupportsAllCharacters(characterData.mixed)
    })
})

test.describe('TC-LOGIN-06 - 14: Test Login Authentication Scenarios', () => {

    // for (const scenarios of scenariosDataLogin) {
    //     test(`${scenarios.title}`, async ({ loginPage, page }) => {
    //         await loginPage.goto()
    //         await loginPage.login(scenarios.username, scenarios.password)
            
    //         if (scenarios.errorMessage !== null) {
    //             await loginPage.expectErrorMessage(scenarios.errorMessage)
    //         } else {
    //             await expect(page).toHaveURL(loginPage.urlAfterLogin)
    //         }
    //     })
    // }

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
    })

    test('TC-LOGIN-06: Login แบบไม่กรอกข้อมูล', async ({ loginPage }) => {
        await loginPage.login(loginData.empty.username, loginData.empty.password)
        await loginPage.expectErrorMessage(messageErrorData.usernameError)
    })

    test('TC-LOGIN-07: Login โดยกรอกแค่ username ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.login(loginData.valid.username, loginData.empty.password)
        await loginPage.expectErrorMessage(messageErrorData.passwordError)
    })

    test('TC-LOGIN-008: Login โดยกรอกแค่ password ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.login(loginData.empty.username, loginData.valid.password)
        await loginPage.expectErrorMessage(messageErrorData.usernameError)
    })

    test('TC-LOGIN-009: Login โดยกรอกแค่ username ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.login(loginData.invalid.username, loginData.empty.password)
        await loginPage.expectErrorMessage(messageErrorData.passwordError)
    })
    
    test('TC-LOGIN-010: Login โดยกรอกแค่ password ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.login(loginData.empty.username, loginData.invalid.password)
        await loginPage.expectErrorMessage(messageErrorData.usernameError)
    })

    test('TC-LOGIN-011: Login โดยกรอก username และ password ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.login(loginData.invalid.username, loginData.invalid.password)
        await loginPage.expectErrorMessage(messageErrorData.invalidError)
    })

    test('TC-LOGIN-012: Login โดยกรอก username ที่ถูกต้อง และ password ที่ไม่มีในระบบ', async ({ loginPage }) => {
        await loginPage.login(loginData.valid.username, loginData.invalid.password)
        await loginPage.expectErrorMessage(messageErrorData.invalidError)
    })

    test('TC-LOGIN-013: Login โดยกรอก username ที่ไม่มีในระบบ และ password ที่ถูกต้อง', async ({ loginPage }) => {
        await loginPage.login(loginData.invalid.username, loginData.valid.password)
        await loginPage.expectErrorMessage(messageErrorData.invalidError)
    })

    test('TC-LOGIN-014: Login โดยกรอก username และ password ที่ถูกต้อง', async ({ loginPage, page }) => {
        await loginPage.login(loginData.valid.username, loginData.valid.password)
        expect(page).toHaveURL(loginPage.urlAfterLogin)
    })
})

test.describe('TC-LOGIN-015 - 16: Test Shortcuts', () => {
    
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
    })

    test('TC-LOGIN-015: ', async ({ loginPage, page }) => {
        await loginPage.loginWithTabKey(loginData.valid.username, loginData.valid.password)
        expect(page).toHaveURL(loginPage.urlAfterLogin)
    })

    test('TC-LOGIN-016: ', async ({ loginPage, page }) => {
        await loginPage.loginWithEnterKey(loginData.valid.username, loginData.valid.password)
        expect(page).toHaveURL(loginPage.urlAfterLogin)
    })
})