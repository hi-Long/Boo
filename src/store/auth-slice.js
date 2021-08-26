import { createSlice } from "@reduxjs/toolkit"
import { createUser, fetchUser, updateUser } from "./auth-actions"
import { createDelivery } from "./checkout-actions"

const initialState = {
    isAuth: false,
    user: {
        delivery: []
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setUserInfo: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = null
            state.isAuth = false
        }
    },
    extraReducers: {
        [createUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.isAuth = true
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.user = action.payload.user
            state.isAuth = true
        },
        [updateUser.fulfilled]: (state, action) => {
            state.user = action.payload.newUser
        },
        [createDelivery.fulfilled]: (state, action) => {
            state.user.delivery = action.payload.delivery
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer