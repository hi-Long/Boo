import { FORM_EMAIL_INPUT, FORM_EMAIL_VALIDITY, FORM_NAME_INPUT, FORM_NAME_VALIDITY, FORM_PASSWORD_INPUT, FORM_PASSWORD_VALIDITY, FORM_PHONE_INPUT, FORM_PHONE_VALIDITY } from "./authConstants";

export const formInitialState = {
    email: {
        value: '',
        invalid: false
    },
    phone: {
        value: '',
        invalid: false
    },
    password: {
        value: '',
        invalid: false
    },
    name: {
        value: '',
        invalid: true
    }
}

export const formReducer = (state, action) => {
    console.log('Action: ', action)
    switch (action.type) {
        case FORM_EMAIL_INPUT:
            return {
                ...state,
                email: {
                    invalid: false,
                    value: action.payload
                }
            }
        case FORM_EMAIL_VALIDITY:
            return {
                ...state,
                email: {
                    ...state.email,
                    invalid: action.payload
                }
            }
        case FORM_PHONE_INPUT:
            return {
                ...state,
                phone: {
                    invalid: false,
                    value: action.payload
                }
            }
        case FORM_PHONE_VALIDITY:
            return {
                ...state,
                phone: {
                    ...state.phone,
                    invalid: action.payload
                }
            }
        case FORM_PASSWORD_INPUT:
            return {
                ...state,
                password: {
                    invalid: false,
                    value: action.payload
                }
            }
        case FORM_PASSWORD_VALIDITY:
            return {
                ...state,
                password: {
                    ...state.password,
                    invalid: action.payload
                }
            }
        case FORM_NAME_INPUT:
            return {
                ...state,
                name: {
                    invalid: false,
                    value: action.payload
                }
            }
        case FORM_NAME_VALIDITY:
            return {
                ...state,
                name: {
                    ...state.name,
                    invalid: action.payload
                }
            }
        default:
            throw new Error("Typo error")
    }
}
