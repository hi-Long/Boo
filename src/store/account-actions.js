import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_ROUTE_ORDERS } from "../constants";

export const fetchOrders = createAsyncThunk(
    'account/fetchOrders',
    async userId => {
        try {
            const response = await axios.get(`${SERVER_ROUTE_ORDERS}?userId=${userId}`)
            return { orders: response.data }
        } catch (err) {
            console.log(err)
        }
    }
)