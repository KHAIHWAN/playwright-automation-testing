export const characterData = {
    upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowerCase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    specialCharacters: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    mixed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='
}

export const characterData2 = [
    {
        label: 'Upper Case',
        value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
        label: 'Lower Case',
        value: 'abcdefghijklmnopqrstuvwxyz'
    },
    {
        label: 'Numbers',
        value: '0123456789'
    },
    {
        label: 'Special Characters',
        value: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    },
    {
        label: 'Mixed Characters',
        value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='
    },
]

export const loginData = {
    valid: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    invalid: {
        username: 'invalid_user',
        password: 'invalid_password'
    },
    empty: {
        username: '',
        password: ''
    }
}

export const messageErrorData = {
    usernameError: 'Epic sadface: Username is required',
    passwordError: 'Epic sadface: Password is required',
    invalidError: 'Epic sadface: Username and password do not match any user in this service',
    onlyLoggedInError: 'Epic sadface: You can only access "/cart.html" when you are logged in.'
}

export const scenariosDataLogin =[
    {
        title: 'TC-LOGIN-06: Login แบบไม่กรอกข้อมูล',
        username: '',
        password: '',
        errorMessage: 'Epic sadface: Username is required'
    },
    {
        title: 'TC-LOGIN-07: Login กรอกแค่ username ที่ถูกต้อง',
        username: 'standard_user',
        password: '',
        errorMessage: 'Epic sadface: Password is required'
    },
    {
        title: 'TC-LOGIN-08: Login กรอกแค่ password ที่ถูกต้อง',
        username: '',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username is required'
    },
    {
        title: 'TC-LOGIN-09: Login กรอกแค่ username ที่ไม่มีในระบบ',
        username: 'invalid_user',
        password: '',
        errorMessage: 'Epic sadface: Password is required'
    },
    {
        title: 'TC-LOGIN-10: Login กรอกแค่ Password ที่ไม่มีในระบบ',
        username: '',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username is required'
    },
    {
        title: 'TC-LOGIN-11: Login กรอก username และ password ที่ไม่มีในระบบ',
        username: 'invalid_user',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        title: 'TC-LOGIN-12: Login กรอก username ถูกต้อง แต่ password ไม่ไม่มีในระบบ',
        username: 'standard_user',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        title: 'TC-LOGIN-13: Login กรอก username ที่ไม่มีในระบบ และ password ที่ถูกต้อง',
        username: 'invalid_user',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        title: 'TC-LOGIN-14: Login กรอก username และ password ถูกต้อง',
        username: 'standard_user',
        password: 'secret_sauce',
        errorMessage: null
    }
]