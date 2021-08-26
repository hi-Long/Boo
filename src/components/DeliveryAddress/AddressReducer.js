import { CHECKOUT_PAGE_DELIVERY_ADDRESS_INPUT, CHECKOUT_PAGE_DELIVERY_ADDRESS_VALIDITY, CHECKOUT_PAGE_DELIVERY_NAME_INPUT, CHECKOUT_PAGE_DELIVERY_NAME_VALIDITY, CHECKOUT_PAGE_DELIVERY_PHONE_INPUT, CHECKOUT_PAGE_DELIVERY_PHONE_VALIDITY } from "../../constants"

const initialState = {
    value: '',
    valid: false
}

export const formInitialState = {
    name: initialState,
    phone: initialState,
    address: initialState
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
        case CHECKOUT_PAGE_DELIVERY_NAME_INPUT:
            return inputUpdatedObj(state, action, 'name')
        case CHECKOUT_PAGE_DELIVERY_NAME_VALIDITY:
            return validityUpdatedObj(state, action, 'name')
        case CHECKOUT_PAGE_DELIVERY_PHONE_INPUT:
            return inputUpdatedObj(state, action, 'phone')
        case CHECKOUT_PAGE_DELIVERY_PHONE_VALIDITY:
            return validityUpdatedObj(state, action, 'phone')
        case CHECKOUT_PAGE_DELIVERY_ADDRESS_INPUT:
            return inputUpdatedObj(state, action, 'address')
        case CHECKOUT_PAGE_DELIVERY_ADDRESS_VALIDITY:
            return validityUpdatedObj(state, action, 'address')
        default:
            throw new Error("Typo error!")
    }
}