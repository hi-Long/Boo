import { ACCOUNT_PAGE_RESET_PASSWORD_CURRENT_INPUT, ACCOUNT_PAGE_RESET_PASSWORD_CURRENT_VALIDITY, ACCOUNT_PAGE_RESET_PASSWORD_NEW_INPUT, ACCOUNT_PAGE_RESET_PASSWORD_NEW_VALIDITY, ACCOUNT_PAGE_RESET_PASSWORD_RETYPED_INPUT, ACCOUNT_PAGE_RESET_PASSWORD_RETYPES_VALIDITY } from "../../../constants";

export const formInitialState = {
    currentPassword: {
        value: '',
        invalid: false
    },
    newPassword: {
        value: '',
        invalid: false
    },
    retypedPassword: {
        value: '',
        invalid: false
    }
}

export const formReducer = (state, action) => {
    console.log('Action: ', action)
    switch (action.type) {
        case ACCOUNT_PAGE_RESET_PASSWORD_CURRENT_INPUT:
            return {
                ...state,
                currentPassword: {
                    invalid: false,
                    value: action.payload
                }
            }
        case ACCOUNT_PAGE_RESET_PASSWORD_CURRENT_VALIDITY:
            return {
                ...state,
                currentPassword: {
                    ...state.currentPassword,
                    invalid: action.payload
                }
            }
        case ACCOUNT_PAGE_RESET_PASSWORD_NEW_INPUT:
            return {
                ...state,
                newPassword: {
                    invalid: false,
                    value: action.payload
                }
            }
        case ACCOUNT_PAGE_RESET_PASSWORD_NEW_VALIDITY:
            return {
                ...state,
                newPassword: {
                    ...state.newPassword,
                    invalid: action.payload
                }
            }
        case ACCOUNT_PAGE_RESET_PASSWORD_RETYPED_INPUT:
            return {
                ...state,
                retypedPassword: {
                    invalid: false,
                    value: action.payload
                }
            }
        case ACCOUNT_PAGE_RESET_PASSWORD_RETYPES_VALIDITY:
            return {
                ...state,
                retypedPassword: {
                    ...state.retypedPassword,
                    invalid: action.payload
                }
            }
        default:
            throw new Error("Typo error")
    }
}
