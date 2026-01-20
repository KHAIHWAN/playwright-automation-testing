export const inputDataTest = [
    {
        title: 'TC-LOGIN-001: พิมพ์ตัวอักษรพิมพ์ใหญ่ (Uppercase) ทั้ง username และ password',
        dataTest: 'ABCDEF'
    },
    {
        title: 'TC-LOGIN-002: พิมพ์ตัวอักษรพิมพ์เล็ก (Lowercase) ทั้ง username และ password',
        dataTest: 'abcdef'
    },
    {
        title: 'TC-LOGIN-003: พิมพ์ตัวเลข (Numbers) ทั้ง username และ password',
        dataTest: '123456'
    },
    {
        title: 'TC-LOGIN-004: พิมพ์ตัวอักษรพิเศษ (SpecialChars) ทั้ง username และ password',
        dataTest: '!@#$%^&*()_+{}'
    },
    {
        title: 'TC-LOGIN-005: พิมพ์ตัวอักษรผสม (Mixed) ทั้ง username และ password',
        dataTest: 'Abc123!@#'   
    }
]

export const loginDataTest = [
    {
        title: 'TC-LOGIN-006: ไม่กรอกอะไรเลย',
        username: '',
        password: '',
        errorMessage: 'Epic sadface: Username is required'
    },
    {
        title: 'TC-LOGIN-007: กรอกแค่ username ที่ถูกต้องเท่านั้น',
        username: 'standard_user',
        password: '',
        errorMessage: 'Epic sadface: Password is required'
    },
    {
        title: 'TC-LOGIN-008: กรอกแค่ password ที่ถูกต้องเท่านั้น',
        username: '',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username is required'
    },
    {
        title: 'TC-LOGIN-009: กรอก username และ password ที่ถูกต้องเท่านั้น',
        username: 'standard_user',
        password: 'secret_sauce',
        errorMessage: null
    },
    {
        title: 'TC-LOGIN-010: กรอก username ที่ไม่มีในระบบ',
        username: 'invalid_user',
        password: '',
        errorMessage: 'Epic sadface: Password is required'
    },
    {
        title: 'TC-LOGIN-011: กรอกแค่ password ที่ไม่มีในระบบ',
        username: '',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username is required'
    },
    {
        title: 'TC-LOGIN-012: กรอก username และ password ที่ไม่มีในระบบ',
        username: 'invalid_user',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        title: 'TC-LOGIN-013: กรอก username ถูกต้อง แต่ password ไม่ถูกต้อง',
        username: 'standard_user',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        title: 'TC-LOGIN-014: กรอก username ไม่ถูกต้อง แต่ password ถูกต้อง',
        username: 'invalid_user',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service'
    }
]