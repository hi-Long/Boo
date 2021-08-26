import { createSlice } from "@reduxjs/toolkit"
import { deleteOrders, deleteUsers, fetchOrders, fetchProducts, fetchUsers, updateOrder } from "./admin-actions"

const initialState = {
    users: [],
    orders: [],
    products: []
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.products = action.payload.products
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = action.payload.users
        },
        [deleteUsers.fulfilled]: (state, action) => {
            const deletedUserIds = action.payload.userIds
            state.users = state.users.filter(user => !deletedUserIds.includes(user.id))
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.orders = action.payload.orders
        },
        [updateOrder.fulfilled]: (state, action) => {
            const updatedOrder = action.payload.updatedOrder
            state.orders = state.orders.map(order => order.id === updatedOrder.id ? updatedOrder : order)
        },
        [deleteOrders.fulfilled]: (state, action) => {
            const deletedOrdersIds = action.payload.orderIds
            state.orders = state.orders.filter(order => !deletedOrdersIds.includes(order.id))
        }
    }
})

export const adminActions = adminSlice.actions
export default adminSlice.reducer