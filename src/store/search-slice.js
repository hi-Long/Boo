import { createSlice } from "@reduxjs/toolkit"
import { fetchAllProducts, fetchAllProductsBySubcategory, fetchProductsByParams, searchProductsByName } from "./search-action"

const initialState = {
    name: "",
    searchResults: [],
    noResults: 0,
    products: [],
    noProducts: 0,
    params: {
        sort: 'date',
        order: 'date',
        concepts: [],
        colors: [],
        materials: [],
        price: {
            from: 0,
            to: 20000000
        },
        page: 0
    }
}

const paramsArrayReducer = (state, param, newValue) => {
    if (state.params[param].includes(newValue)) {
        state.params[param] = state.params[param].filter(concept => concept !== newValue)
    } else {
        state.params[param].push(newValue)
    }
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setSort: (state, action) => {
            state.params.sort = action.payload
        },
        setOrder: (state, action) => {
            state.params.order = action.payload
        },
        setConcepts: (state, action) => {
            const newConcept = action.payload
            paramsArrayReducer(state, 'concepts', newConcept)
        },
        setColors: (state, action) => {
            const newColor = action.payload
            paramsArrayReducer(state, 'colors', newColor)
        },
        setMaterials: (state, action) => {
            const newMaterial = action.payload
            paramsArrayReducer(state, 'materials', newMaterial)
        },
        setPrice: (state, action) => {
            state.params.price = action.payload
        },
        setParams: (state, action) => {
            console.log(action.payload)
            state.params = action.payload
        },
        resetResults: (state, action) => {
            state.searchResults = []
            state.noResults = 0
        },
        resetParams: (state, action) => {
            state.params = initialState.params
        }
    },
    extraReducers: {
        [searchProductsByName.fulfilled]: (state, action) => {
            state.searchResults = action.payload.searchResults
            state.noResults = action.payload.noResults
        },
        [fetchAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload.results
            state.noProducts = action.payload.noResults
        },
        [fetchAllProductsBySubcategory.fulfilled]: (state, action) => {
            state.products = action.payload.results
            state.noProducts = action.payload.noResults
        },
        [fetchProductsByParams.fulfilled]: (state, action) => {
            state.products = action.payload.products
            state.noProducts = action.payload.noProducts
        }
    }
})

export const searchActions = searchSlice.actions
export default searchSlice.reducer