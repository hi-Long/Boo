import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_ROUTE_ORDERS, SERVER_ROUTE_USERS } from "../constants";

export const createDelivery = createAsyncThunk(
    'checkout/createDelivery',
    async newUserInfo => {
        try {
            await axios.put(`${SERVER_ROUTE_USERS}/${newUserInfo.id}`, newUserInfo)
            return { delivery: newUserInfo.delivery }
        } catch (err) {
            console.log(err)
        }
    }
)

export const createOrder = createAsyncThunk(
    'checkout/createOrder',
    async newOrderInfo => {
        try {
            await axios.post(`${SERVER_ROUTE_ORDERS}`, newOrderInfo)
        } catch (err) {
            console.log(err)
        }
    }
)