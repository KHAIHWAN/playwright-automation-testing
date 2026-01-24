import { CheckoutInfo } from '../pages/checkout-step-one.page'

// Valid checkout data
export const CHECKOUT_DATA: Record<string, CheckoutInfo> = {
    VALID: {
        firstName: 'John',
        lastName: 'Doe',
        zipCode: '12345'
    },
    VALID_ALT: {
        firstName: 'Jane',
        lastName: 'Smith',
        zipCode: '54321'
    },
    SPECIAL_CHARS: {
        firstName: 'John-Paul',
        lastName: "O'Brien",
        zipCode: 'SW1A 1AA'
    },
    UNICODE: {
        firstName: 'สมชาย',
        lastName: 'ใจดี',
        zipCode: '10200'
    },
    MIXED_CASE: {
        firstName: 'JoHn',
        lastName: 'DoE',
        zipCode: 'ABC123'
    },
    WITH_SPACES: {
        firstName: 'John Paul',
        lastName: 'Van Der Berg',
        zipCode: '12 345'
    }
}

// Error messages for checkout step one
export const ERROR_MESSAGES_CHECKOUT = {
    FIRST_NAME_REQUIRED: 'Error: First Name is required',
    LAST_NAME_REQUIRED: 'Error: Last Name is required',
    ZIP_CODE_REQUIRED: 'Error: Postal Code is required'
};

// Partial data for validation testing
export const PARTIAL_CHECKOUT_DATA = {
    ONLY_FIRST_NAME: {
        firstName: 'John',
        lastName: '',
        zipCode: ''
    },
    ONLY_LAST_NAME: {
        firstName: '',
        lastName: 'Doe',
        zipCode: ''
    },
    ONLY_ZIP_CODE: {
        firstName: '',
        lastName: '',
        zipCode: '12345'
    },
    MISSING_FIRST_NAME: {
        firstName: '',
        lastName: 'Doe',
        zipCode: '12345'
    },
    MISSING_LAST_NAME: {
        firstName: 'John',
        lastName: '',
        zipCode: '12345'
    },
    MISSING_ZIP_CODE: {
        firstName: 'John',
        lastName: 'Doe',
        zipCode: ''
    },
    ALL_EMPTY: {
        firstName: '',
        lastName: '',
        zipCode: ''
    }
}

// Test scenarios for comprehensive testing
export const CHECKOUT_SCENARIOS = [
    {
        description: 'Valid data with standard names',
        data: CHECKOUT_DATA.VALID,
        shouldPass: true
    },
    {
        description: 'Valid data with hyphens and apostrophes',
        data: CHECKOUT_DATA.SPECIAL_CHARS,
        shouldPass: true
    },
    {
        description: 'Valid data with numbers only',
        data: CHECKOUT_DATA.NUMBERS_ONLY,
        shouldPass: true
    },
    {
        description: 'Valid data with long strings',
        data: CHECKOUT_DATA.LONG_STRINGS,
        shouldPass: true
    },
    {
        description: 'Invalid - missing first name',
        data: PARTIAL_CHECKOUT_DATA.MISSING_FIRST_NAME,
        shouldPass: false,
        expectedError: ERROR_MESSAGES_CHECKOUT.FIRST_NAME_REQUIRED
    },
    {
        description: 'Invalid - missing last name',
        data: PARTIAL_CHECKOUT_DATA.MISSING_LAST_NAME,
        shouldPass: false,
        expectedError: ERROR_MESSAGES_CHECKOUT.LAST_NAME_REQUIRED
    },
    {
        description: 'Invalid - missing zip code',
        data: PARTIAL_CHECKOUT_DATA.MISSING_ZIP_CODE,
        shouldPass: false,
        expectedError: ERROR_MESSAGES_CHECKOUT.ZIP_CODE_REQUIRED
    },
    {
        description: 'Invalid - all fields empty',
        data: PARTIAL_CHECKOUT_DATA.ALL_EMPTY,
        shouldPass: false,
        expectedError: ERROR_MESSAGES_CHECKOUT.FIRST_NAME_REQUIRED
    }
]