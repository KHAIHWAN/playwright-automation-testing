export const characterData = {
    upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowerCase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    specialCharacters: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    mixed: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='
}

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

export const errorMessageData = {
    errorUsername: 'Epic sadface: Username is required',
    errorPassword: 'Epic sadface: Password is required',
    errorInvalid: 'Epic sadface: Username and password do not match any user in this service'
}