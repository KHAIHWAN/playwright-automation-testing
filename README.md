# 🎭 Playwright Automation Testing Project

โปรเจกต์ทดสอบอัตโนมัติด้วย Playwright สำหรับการทดสอบเว็บแอปพลิเคชัน

## Technologies Used

- **Programming Language:** TypeScript
- **Automation Testing Framework:** Playwright

## Test Cases

รายละเอียด Test Cases สามารถดูได้ที่: https://docs.google.com/spreadsheets/d/1wg7y8I60gOhMBpea5wH156_fEOdQORGV-Ml_Jyif81s/edit?usp=drive_link

## Prerequisites

- Node.js (version 16 หรือสูงกว่า)
- npm หรือ yarn

## Setup

1. Clone repository:
```bash
git clone https://github.com/KHAIHWAN/playwright-automation-testing
cd playwright-automation-testing
```

2. ติดตั้ง dependencies:
```bash
npm install
```

3. ติดตั้ง browsers สำหรับ Playwright:
```bash
npx playwright install
```

## Example Usage

### รัน test ทั้งหมด
```bash
npx playwright test
```

### รันเฉพาะไฟล์
```bash
npx playwright test inventory.spec.ts
```

### รันแบบเห็น browser
```bash
npx playwright test --headed
```

## Documentation

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
