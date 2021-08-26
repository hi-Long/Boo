import { ACCOUNT_PAGE_PERSONAL_INFO_ADDRESS_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_ADDRESS_VALIDITY, ACCOUNT_PAGE_PERSONAL_INFO_DOB_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_EMAIL_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_EMAIL_VALIDITY, ACCOUNT_PAGE_PERSONAL_INFO_GENDER_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_NAME_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_NAME_VALIDITY, ACCOUNT_PAGE_PERSONAL_INFO_PHONE_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_PHONE_VALIDITY } from "../../constants"

const initialState = {
    value: '',
    valid: false
}

export const formInitialState = {
    name: initialState,
    phone: initialState,
    email: initialState,
    address: initialState,
    dob: { value: new Date().getTime() },
    gender: "Nam"
}

const inputUpdatedObj = (state, action, prop) => {
    return {
        ...state,
        [prop]: {
            invalid: false,
            value: action.payload
        }
    }
}

const validityUpdatedObj = (state, action, prop) => {
    return {
        ...state,
        [prop]: {
            ...state[prop],
            invalid: action.payload
        }
    }
}

export const formReducer = (state, action) => {
    switch (action.type) {
        case ACCOUNT_PAGE_PERSONAL_INFO_NAME_INPUT:
            return inputUpdatedObj(state, action, 'name')
        case ACCOUNT_PAGE_PERSONAL_INFO_NAME_VALIDITY:
            return validityUpdatedObj(state, action, 'name')
        case ACCOUNT_PAGE_PERSONAL_INFO_PHONE_INPUT:
            return inputUpdatedObj(state, action, 'phone')
        case ACCOUNT_PAGE_PERSONAL_INFO_PHONE_VALIDITY:
            return validityUpdatedObj(state, action, 'phone')
        case ACCOUNT_PAGE_PERSONAL_INFO_ADDRESS_INPUT:
            return inputUpdatedObj(state, action, 'address')
        case ACCOUNT_PAGE_PERSONAL_INFO_ADDRESS_VALIDITY:
            return validityUpdatedObj(state, action, 'address')
        case ACCOUNT_PAGE_PERSONAL_INFO_EMAIL_INPUT:
            return inputUpdatedObj(state, action, 'email')
        case ACCOUNT_PAGE_PERSONAL_INFO_EMAIL_VALIDITY:
            return validityUpdatedObj(state, action, 'email')
        case ACCOUNT_PAGE_PERSONAL_INFO_DOB_INPUT:
            return {
                ...state,
                dob: { value: action.payload }
            }
        case ACCOUNT_PAGE_PERSONAL_INFO_GENDER_INPUT:
            return {
                ...state,
                gender: action.payload
            }
        case "SET_ALL":
            console.log(action.payload)
            return action.payload
        default:
            throw new Error("Typo error!")
    }
}