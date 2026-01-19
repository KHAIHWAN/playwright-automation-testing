import { test, expect } from '../fixtures/test.fixture'

import { textData,loginData, loginErrorMessages } from '../data/login.data'

test.describe('Input text validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage()
  })

  test('TC-LOGIN-001: พิมพ์ตัวอักษรพิมพ์ใหญ่ (Uppercase) ทั้ง username และ password', async ({ loginPage }) => {
    await loginPage.fillTextUsername(textData.uppercase)
    await loginPage.fillTextPassword(textData.uppercase)
  })

  test('TC-LOGIN-002: พิมพ์ตัวอักษรพิมพ์เล็ก (Lowercase) ทั้ง username และ password', async ({ loginPage }) => {
      await loginPage.fillTextUsername(textData.lowercase)
      await loginPage.fillTextPassword(textData.lowercase)
  })

  test('TC-LOGIN-003: พิมพ์ตัวเลข (Numeric) ทั้ง username และ password', async ({ loginPage }) => {
      await loginPage.fillTextUsername(textData.numbers)
      await loginPage.fillTextPassword(textData.numbers)
  })

  test('TC-LOGIN-004: พิมพ์อักษรพิเศษ (Special Characters) ทั้ง username และ password', async ({ loginPage }) => {
      await loginPage.fillTextUsername(textData.specialChars)
      await loginPage.fillTextPassword(textData.specialChars)
  })

  test('TC-LOGIN-005: พิมพ์ผสมทุกแบบ (Mixed Input) ทั้ง username และ password', async ({ loginPage }) => {
      await loginPage.fillTextUsername(textData.mixed)
      await loginPage.fillTextPassword(textData.mixed)
  })
})

test.describe.only('Login validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage()
  })

  test('TC-LOGIN-006: ไม่พิมพ์ทั้ง username และ password', async ({ loginPage }) => {
    await loginPage.login()
    const errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBe(loginErrorMessages.emptyUsername)
  })

  test('TC-LOGIN-007: พิมพ์แค่ username ถูกต้อง', async ({ loginPage }) => {
    await loginPage.login(loginData.valid.username)
    const errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBe(loginErrorMessages.emptyPassword)
  })

  test('TC-LOGIN-008: พิมพ์แค่ password ถูกต้อง', async ({ loginPage }) => {
    await loginPage.login(loginData.valid.password)
    const errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBe(loginErrorMessages.emptyPassword)
  })

  test('TC-LOGIN-009: พิมพ์ username ถูกต้อง แต่ password ไม่ถูกต้อง', async ({ loginPage }) => {
    await loginPage.login(loginData.valid.username, loginData.invalid.password)
    const errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBe(loginErrorMessages.invalid)
  })

  test('TC-LOGIN-010: พิมพ์ username ไม่ถูกต้อง แต่ password ถูกต้อง', async ({ loginPage }) => {
    await loginPage.login(loginData.invalid.username, loginData.valid.password)
    const errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBe(loginErrorMessages.invalid)
  })

  test('TC-LOGIN-011: พิมพ์ username และ password ถูกต้อง', async ({ loginPage }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password)
    const errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBe(loginErrorMessages.invalid)
  })

  test('TC-LOGIN-012: พิมพ์ username และ password ไม่ถูกต้อง', async ({ loginPage }) => {
    await loginPage.login(loginData.invalid.username, loginData.invalid.password)
    const errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBe(loginErrorMessages.invalid)
  })
})

test.describe('Login validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage()
  })
})

