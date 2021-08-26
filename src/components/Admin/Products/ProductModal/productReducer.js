import { ADMIN_PAGE_PRODUCT_COLOR_INPUT, ADMIN_PAGE_PRODUCT_CONCEPT_INPUT, ADMIN_PAGE_PRODUCT_DESC_INPUT, ADMIN_PAGE_PRODUCT_DESC_VALIDITY, ADMIN_PAGE_PRODUCT_IMG_DELETE, ADMIN_PAGE_PRODUCT_IMG_INPUT, ADMIN_PAGE_PRODUCT_MATERIAL_INPUT, ADMIN_PAGE_PRODUCT_NAME_INPUT, ADMIN_PAGE_PRODUCT_NAME_VALIDITY, ADMIN_PAGE_PRODUCT_PRICE_INPUT, ADMIN_PAGE_PRODUCT_PRICE_VALIDITY, ADMIN_PAGE_PRODUCT_SUB_INPUT, ADMIN_PAGE_PRODUCT_SUB_VALIDITY } from "../../../../constants"

export const initialFormState = {
    name: {
        value: '',
        valid: false
    },
    price: {
        value: '',
        valid: false
    },
    concept: '',
    subcategories: {
        value: '',
        valid: false
    },
    color: '',
    material: '',
    description: {
        value: '',
        valid: false
    },
    images: []
}

export const formReducer = (state, action) => {
    let newImages
    switch (action.type) {
        case ADMIN_PAGE_PRODUCT_NAME_INPUT:
            return {
                ...state,
                name: {
                    ...state.name,
                    value: action.payload
                }
            }
        case ADMIN_PAGE_PRODUCT_NAME_VALIDITY:
            return {
                ...state,
                name: {
                    ...state.name,
                    valid: action.payload
                }
            }
        case ADMIN_PAGE_PRODUCT_PRICE_INPUT:
            return {
                ...state,
                price: {
                    ...state.price,
                    value: action.payload
                }
            }
        case ADMIN_PAGE_PRODUCT_PRICE_VALIDITY:
            return {
                ...state,
                price: {
                    ...state.price,
                    valid: action.payload
                }
            }
        case ADMIN_PAGE_PRODUCT_SUB_INPUT:
            return {
                ...state,
                subcategories: {
                    ...state.subcategories,
                    value: action.payload
                }
            }
        case ADMIN_PAGE_PRODUCT_SUB_VALIDITY:
            return {
                ...state,
                subcategories: {
                    ...state.subcategories,
                    valid: action.payload
                }
            }
        case ADMIN_PAGE_PRODUCT_DESC_INPUT:
            return {
                ...state,
                description: {
                    ...state.description,
                    value: action.payload
                }
            }
        case ADMIN_PAGE_PRODUCT_DESC_VALIDITY:
            return {
                ...state,
                description: {
                    ...state.description,
                    valid: action.payload
                }
            }
        case ADMIN_PAGE_PRODUCT_CONCEPT_INPUT:
            return {
                ...state,
                concept: action.payload
            }
        case ADMIN_PAGE_PRODUCT_COLOR_INPUT:
            return {
                ...state,
                color: action.payload
            }
        case ADMIN_PAGE_PRODUCT_MATERIAL_INPUT:
            return {
                ...state,
                material: action.payload
            }
        case ADMIN_PAGE_PRODUCT_IMG_INPUT:
            newImages = state.images
            newImages.unshift((action.payload))
            return {
                ...state,
                images: newImages
            }
        case ADMIN_PAGE_PRODUCT_IMG_DELETE:
            newImages = state.images.filter(img => img.url !== action.payload)
            return {
                ...state,
                images: newImages
            }
        case "SET_ALL":
            const newState = action.payload
            return {
                name: {
                    value: newState.name,
                    valid: true
                },
                price: {
                    value: newState.price,
                    valid: true
                },
                concept: newState.concept,
                subcategories: {
                    value: newState.subcategories,
                    valid: false
                },
                color: action.payload.color,
                material: action.payload.material,
                description: {
                    value: action.payload.description,
                    valid: false
                },
                images: newState.images
            }
        case "RESET":
            let resetState = {
                ...initialFormState,
                images: []
            }
            return resetState
        default:
            throw new Error("Typo Error!")
    }
}
