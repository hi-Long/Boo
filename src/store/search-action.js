import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_ROUTE_PRODUCTS } from '../constants';

export const searchProductsByName = createAsyncThunk('search/searchByName', async name => {
    const response = await axios.get(`${SERVER_ROUTE_PRODUCTS}?name_like=${name}`)
    const responseData = response.data

    let noResults = 0
    const searchResults = {
        subcategories: [],
        names: [],
        materials: [],
        ids: []
    }

    const filterSearchResults = (field, value) => {
        if (!field.includes(value)) {
            field.push(value)
            noResults++
        }
    }

    responseData.forEach(product => {
        const { subcategories, name, material, id } = product
        filterSearchResults(searchResults.subcategories, subcategories)
        filterSearchResults(searchResults.materials, material)
        filterSearchResults(searchResults.names, name)
        filterSearchResults(searchResults.ids, id)
    });

    return { searchResults, noResults }
})

export const fetchAllProductsBySubcategory = createAsyncThunk(
    'search/searchBySubcategory',
    async (subcategory) => {
        const response = await axios.get(`${SERVER_ROUTE_PRODUCTS}?subcategories=${subcategory}&_page=0&_limit=16`)
        return {
            results: response.data,
            noResults: response.headers['x-total-count']
        }
    }
)

export const fetchProductsByParams = createAsyncThunk(
    'search/fetchProductsByParams',
    async params => {
        const subcategories = `subcategories=${params.subcategory}&`
        const sort = `_sort=${params.sort}&`
        const order = `_order=${params.order}&`
        const color = params.colors.length ? params.colors.map(c => `color_like=${c}&`).join('') : ''
        const materials = params.materials.length ? params.materials.map(m => `material_like=${m}&`).join('') : ''
        const concepts = params.concepts.length ? params.concepts.map(c => `concept_like=${c}&`).join('') : ''
        const price = `price_gte=${params.price.from}&price_lte=${params.price.to}&`
        const page = `_page=${params.page}&`
        const query = `?${subcategories}${sort}${order}${materials}${concepts}${price}${page}${color}_limit=16`

        try {
            const response = await axios.get(`${SERVER_ROUTE_PRODUCTS}${query}`)
            return {
                products: response.data,
                noResults: response.headers['x-total-count']
            }
        } catch (err) {
            console.log(err)
        }
    }
)

export const fetchAllProducts = createAsyncThunk(
    'search/fetchAllProducts',
    async page => {
        const response = await axios.get(`${SERVER_ROUTE_PRODUCTS}?_page=${page}&limit={16}`)
        return {
            noResults: response.headers['x-total-count'],
            results: response.data
        }
    }
)


