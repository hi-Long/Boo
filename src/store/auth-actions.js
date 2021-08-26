import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_ROUTE_USERS } from "../constants";
import { userDataStructure } from "../dataStructure";

export const createUser = createAsyncThunk(
    'auth/createUser',
    async userInfo => {
        const { id, email, phone, name } = userInfo
        const newUser = {
            ...userDataStructure,
            id: id,
            email,
            phone,
            name
        }
        await axios.post(`${SERVER_ROUTE_USERS}`, newUser)
        return { user: newUser }
    }
)

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async userId => {
        const response = await axios.get(`${SERVER_ROUTE_USERS}?id=${userId}`)
        return { user: response.data[0] }
    }
)

export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async newUser => {
        try {
            await axios.put(`${SERVER_ROUTE_USERS}/${newUser.id}`, newUser)
            return { newUser }
        } catch (err) {
            console.log(err)
        }
    }
)


