import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_ROUTE_ORDERS, SERVER_ROUTE_PRODUCTS, SERVER_ROUTE_USERS } from "../constants";

export const fetchProducts = createAsyncThunk(
    'admin/fetchProducts',
    async () => {
        try {
            const response = await axios.get(`${SERVER_ROUTE_PRODUCTS}`)
            return { products: response.data }
        } catch (err) {
            console.log(err)
        }
    }
)

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async () => {
        try {
            const response = await axios.get(`${SERVER_ROUTE_USERS}?_embed=orders`)
            return { users: response.data }
        } catch (err) {
            console.log(err)
        }
    }
)

export const deleteUsers = createAsyncThunk(
    'admin/deleteUsers',
    async userIds => {
        const requests = userIds.map(id => axios.delete(`${SERVER_ROUTE_USERS}/${id}`))
        try {
            await axios.all(requests)
            return { userIds }
        } catch (err) {
            console.log(err)
        }
    }
)

export const fetchOrders = createAsyncThunk(
    'admin/fetchOrders',
    async () => {
        try {
            const response = await axios.get(`${SERVER_ROUTE_ORDERS}`)
            return { orders: response.data }
        } catch (err) {
            console.log(err)
        }
    }
)

export const updateOrder = createAsyncThunk(
    'admin/updateOrder',
    async updatedOrder => {
        try {
            await axios.put(`${SERVER_ROUTE_ORDERS}/${updatedOrder.id}`, updatedOrder)
            return { updatedOrder }
        } catch (err) {
            console.log(err)
        }
    }
)

export const deleteOrders = createAsyncThunk(
    'admin/deleteOrders',
    async orderIds => {
        const requests = orderIds.map(id => axios.delete(`${SERVER_ROUTE_ORDERS}/${id}`))
        try {
            await axios.all(requests)
            return { orderIds }
        } catch (err) {
            console.log(err)
        }
    }
)