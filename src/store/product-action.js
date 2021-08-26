import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { uuid } from "uuidv4";
import { SERVER_ROUTE_CONCEPTS, SERVER_ROUTE_PRODUCTS } from "../constants";

export const fetchConcepts = createAsyncThunk(
    'product/fetchConcepts',
    async () => {
        const response = await axios.get(SERVER_ROUTE_CONCEPTS)
        return { categories: response.data }
    }
)

export const createConcept = createAsyncThunk(
    'product/createConcept',
    async concept => {
        try {
            const newConcept = {
                id: uuid().slice(0, 8),
                name: concept
            }
            await axios.post(SERVER_ROUTE_CONCEPTS, newConcept)
            return { concept: newConcept }
        } catch (err) {
            console.log(err)
        }
    }
)

export const updateConcept = createAsyncThunk(
    'product/changeConcept',
    async updatedConcept => {
        const newConcept = { id: updateConcept.id, name: updatedConcept.name }
        await axios.put(`${SERVER_ROUTE_CONCEPTS}/${updatedConcept.id}`, newConcept)
        return { updatedConcept: updatedConcept }
    }
)

export const deleteConcept = createAsyncThunk(
    'product/deleteConcept',
    async conceptId => {
        await axios.delete(`${SERVER_ROUTE_CONCEPTS}/${conceptId}`)
        return { conceptId: conceptId }
    }
)

export const fetchProductsByConcept = createAsyncThunk(
    'product/fetchProductsByConcept',
    async concept => {
        const response = await axios.get(`${SERVER_ROUTE_PRODUCTS}?concept=${concept.id}`)
        return { concept: concept, products: response.data }
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async product => {
        await axios.post(SERVER_ROUTE_PRODUCTS, product)
        return {
            product,
            conceptId: product.concept
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async updatedProduct => {
        try {
            await axios.put(`${SERVER_ROUTE_PRODUCTS}/${updatedProduct.id}`, updatedProduct)
            return {
                updatedProduct,
                conceptId: updatedProduct.concept
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async ids => {
        const { productId, conceptId } = ids
        await axios.delete(`${SERVER_ROUTE_PRODUCTS}/${productId}`)
        return {
            productId: productId, conceptId: conceptId
        }
    }
)