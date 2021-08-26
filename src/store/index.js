import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import searchReducer from './search-slice'
import uiReducer from './ui-slice'
import productReducer from './product-slice'
import cartReducer from './cart-slice'
import checkoutReducer from './checkout-slice'
import accountReducer from './account-slice'
import adminReducer from './admin-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        ui: uiReducer,
        product: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        account: accountReducer,
        admin: adminReducer
    }
})

export default store