import { createSlice } from "@reduxjs/toolkit"
import { fetchOrders } from "./account-actions"
import { deleteOrders } from "./admin-actions"

const initialState = {
    orders: [],
    orderSelected: {}
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setSelectedOrder: (state, action) => {
            state.orderSelected = action.payload
        }
    },
    extraReducers: {
        [fetchOrders.fulfilled]: (state, action) => {
            state.orders = action.payload.orders
        },
        [deleteOrders.fulfilled]: (state, action) => {
            const deletedOrderId = action.payload.orderIds[0]
            state.orders = state.orders.filter(order => order.id !== deletedOrderId)
        }
    }
})

export const accountActions = accountSlice.actions
export default accountSlice.reducer