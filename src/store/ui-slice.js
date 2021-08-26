import { createSlice } from "@reduxjs/toolkit"
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter"
import { fetchOrders } from "./account-actions"
import { fetchProducts } from "./admin-actions"
import { fetchUser } from "./auth-actions"
import { fetchConcepts, fetchProductsByConcept } from "./product-action"
import { fetchProductsByParams } from "./search-action"

const initialState = {
    categoryDrawerShowing: false,
    searchDrawerShowing: false,
    authDrawerShowing: false,
    cartDrawerShowing: false,
    sizeDrawerShowing: false,
    detailsModalShowing: false,
    productEditModalShowing: false,
    confirmationShowing: false,
    snackbarShowing: false,
    productsFetching: true,
    userFetching: true,
    ordersFetching: true,
    deliveriesFetching: true,
    conceptsFetching: true,
    conceptProductsFetching: true
}

// CREATE REDUCER FUNCTIONS FROM INITIAL STATE TO AVOID CODE DUPLICATION
const reducerFunctionsCreator = initialState => {
    const reducersObj = {}
    // With each state properties, create 2 functions: set and toggle
    Object.keys(initialState).forEach(prop => {
        const capitalizedProp = capitalizeFirstLetter(prop)
        reducersObj[`set${capitalizedProp}`] = (state, action) => {
            state[prop] = action.payload
        }
        reducersObj[`toggle${capitalizedProp}`] = (state, action) => {
            state[prop] = action.payload
        }
    })
    return reducersObj
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: reducerFunctionsCreator(initialState),
    extraReducers: {
        [fetchProductsByParams.pending]: (state, action) => {
            state.productsFetching = true
        },
        [fetchProductsByParams.fulfilled]: (state, action) => {
            state.productsFetching = false
        },
        [fetchProductsByConcept.pending]: (state, action) => {
            state.conceptProductsFetching = true
        },
        [fetchProductsByConcept.fulfilled]: (state, action) => {
            state.conceptProductsFetching = false
        },
        [fetchUser.pending]: (state, action) => {
            state.userFetching = true
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.userFetching = false
        },
        [fetchOrders.pending]: (state, action) => {
            state.ordersFetching = true
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.ordersFetching = false
        },
        [fetchProducts.pending]: (state, action) => {
            state.productsFetching = true
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.productsFetching = false
        },
        [fetchConcepts.pending]: (state, action) => {
            state.conceptsFetching = true
        },
        [fetchConcepts.fulfilled]: (state, action) => {
            state.conceptsFetching = false
        }
    }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer
