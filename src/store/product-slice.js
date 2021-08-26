import { createSlice } from '@reduxjs/toolkit'
import { createConcept, fetchConcepts, deleteConcept, updateConcept, fetchProductsByConcept, deleteProduct, createProduct, updateProduct } from './product-action'

const initialState = {
    concepts: [],
    products: [],
    error: ''
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        createConcept: (state, action) => {
            state.concepts.push(action.payload)
        }
    },
    extraReducers: {
        [fetchConcepts.fulfilled]: (state, action) => {
            state.concepts = action.payload.categories
        },
        [createConcept.fulfilled]: (state, action) => {
            state.concepts.unshift(action.payload.concept)
        },
        [updateConcept.fulfilled]: (state, action) => {
            const updatedConcept = action.payload.updatedConcept
            state.concepts = state.concepts.map(concept => concept.id !== updatedConcept.id ? concept : updatedConcept)
        },
        [deleteConcept.fulfilled]: (state, action) => {
            state.concepts = state.concepts.filter(concept => concept.id !== action.payload.conceptId)
        },
        [fetchProductsByConcept.fulfilled]: (state, action) => {
            const fetchedConcept = action.payload.concept
            const fetchedProducts = action.payload.products
            state.concepts = state.concepts
                .map(concept => concept.id === fetchedConcept.id
                    ? { ...concept, products: fetchedProducts }
                    : concept)
        },
        [createProduct.fulfilled]: (state, action) => {
            const { product, conceptId } = action.payload
            state.concepts.forEach(concept => {
                if (concept.id === conceptId) {
                    concept.products.unshift(product)
                }
            })
        },
        [updateProduct.fulfilled]: (state, action) => {
            const { updatedProduct, conceptId } = action.payload
            const newConcepts = state.concepts.map(c => {
                if (c.id === conceptId) {
                    const newProducts = c.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
                    c.products = newProducts
                }
                return c
            })
            state.concepts = newConcepts
        },
        [deleteProduct.fulfilled]: (state, action) => {
            // console.log("Concept id", action.payload.conceptId)
            const { productId, conceptId } = action.payload
            state.concepts.forEach(concept => {
                if (concept.id === conceptId) {
                    concept.products = concept.products.filter(product => product.id !== productId)
                }
            })
        }
    }
})

export const productActions = productSlice.actions
export default productSlice.reducer
