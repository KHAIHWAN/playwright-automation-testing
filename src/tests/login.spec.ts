import { test, expect } from '../fixtures/test.fixture';

import { inputDataTest, loginDataTest } from '../data/login.data'

test.describe('Input text validation', () => {
  for (const dataTest of inputDataTest) {
    test(`${dataTest.title}`, async ({ loginPage }) => {
      await loginPage.goto()
      await loginPage.fillInputText(dataTest.dataTest)
    })
  }
})

test.describe('Login validation', () => {
    for (const dataTest of loginDataTest) {
        test(`${dataTest.title}`, async ({ loginPage }) => {
          await loginPage.goto()

          await loginPage.login(dataTest.username, dataTest.password)

          if (dataTest.errorMessage !== null) {
            const errorText = await loginPage.getErrorMessage()
            await expect(errorText).toBe(dataTest.errorMessage)
            await expect(loginPage.page).toHaveURL(loginPage.urlBeforeLogin)
          } else {
            await expect(loginPage.page).toHaveURL(loginPage.urlAfterLogin)
          }
        })
    }
})

test.describe('Test user keyboard shortcuts', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto()
  })

  test('TC-LOGIN-015: กดปุ่ม Tab บนคีย์บอร์ด Cursor ต้องเลื่อนไปตามลำดับ Username -> Password -> Login', async ({ loginPage }) => {
    await loginPage.clickInputTextUsername()
    
    for (let i = 0; i < 3; i++) {
      await loginPage.page.keyboard.press('Tab')
    }
    
    await loginPage.clickLoginButton()
  })

  test('TC-LOGIN-016: หลังจาก Username และ Password ที่ถูกต้องแล้ว กดปุ่ม Enter บนคีย์บอร์ด' , async ({ loginPage }) => {
    await loginPage.login(loginDataTest[3].username, loginDataTest[3].password)
    await loginPage.page.keyboard.press('Enter')
    await expect(loginPage.page).toHaveURL(loginPage.urlAfterLogin)
  })
})