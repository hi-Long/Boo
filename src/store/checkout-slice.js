import { createSlice } from "@reduxjs/toolkit";
import { createDelivery } from "./checkout-actions";

const initialState = {
    delivery: {
        new: {},
        existed: [],
        selected: {},
        delete: ''
    },
    paymentMethod: '',
    order: {}
}

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setNewDelivery: (state, action) => {
            state.delivery.new = action.payload
        },
        setExistedDelivery: (state, action) => {
            state.deliver.existed = action.payload
        },
        setSelectedDelivery: (state, action) => {
            state.delivery.selected = action.payload
        },
        setDeleteDelivery: (state, action) => {
            state.delivery.delete = action.payload
        },
        setDelete: (state, action) => {
            state.deliver.delete = action.payload
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
        },
        setOrder: (state, action) => {
            state.order = action.payload
        }
    },
    extraReducers: {
        [createDelivery.fulfilled]: (state, action) => {
            state.delivery.existed = action.payload.delivery
        }
    }
})

export const checkoutActions = checkoutSlice.actions
export default checkoutSlice.reducer