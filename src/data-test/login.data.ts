// Valid users
export const VALID_USERS = {
    STANDARD: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    LOCKED_OUT: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    PROBLEM: {
        username: 'problem_user',
        password: 'secret_sauce'
    },
    PERFORMANCE_GLITCH: {
        username: 'performance_glitch_user',
        password: 'secret_sauce'
    }
}

// Invalid test data
export const INVALID_CREDENTIALS = {
    WRONG_USERNAME: {
        username: 'invalid_user',
        password: 'secret_sauce'
    },
    WRONG_PASSWORD: {
        username: 'standard_user',
        password: 'wrong_password'
    },
    BOTH_WRONG: {
        username: 'invalid_user',
        password: 'wrong_password'
    }
}

// Special characters
export const SPECIAL_CHARACTERS = {
    SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    MIXED_CASE: 'AaBbCcDd123',
    NUMBERS_ONLY: '1234567890',
    UPPERCASE: 'UPPERCASE',
    LOWERCASE: 'lowercase',
    THAI: 'ทดสอบภาษาไทย',
    EMOJI: '😀🔒🛒',
    SQL_INJECTION: "admin' OR '1'='1",
    XSS: '<script>alert("xss")</script>'
}

// Error messages
export const ERROR_MESSAGES = {
    USERNAME_REQUIRED: 'Epic sadface: Username is required',
    PASSWORD_REQUIRED: 'Epic sadface: Password is required',
    INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
    LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.'
}

// URLs
export const URLS = {
    LOGIN: 'https://www.saucedemo.com/',
    INVENTORY: 'https://www.saucedemo.com/inventory.html',
    CART: 'https://www.saucedemo.com/cart.html',
    CHECKOUT_STEP_ONE: 'https://www.saucedemo.com/checkout-step-one.html',
    CHECKOUT_STEP_TWO: 'https://www.saucedemo.com/checkout-step-two.html',
    CHECKOUT_COMPLETE: 'https://www.saucedemo.com/checkout-complete.html'
}

export { CHECKOUT_DATA, ERROR_MESSAGES_CHECKOUT, PARTIAL_CHECKOUT_DATA } from './checkout.data'