import { Box, Collapse } from "@material-ui/core"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsByConcept } from "../../../../store/product-action"
import ProductsFilters from "../ProductsFilters"
import ConceptHeader from "./ConceptHeader"
import ConceptProducts from "./ConceptProducts"

const Concepts = props => {
    const dispatch = useDispatch()
    const { concept, snackBarShowing, setSnackbarShowing } = props
    const concepts = useSelector(state => state.product.concepts)
    const products = concepts.find(c => c.id === concept.id).products

    const [isOpened, setIsOpened] = useState(false)
    const [filtersIsOpened, setFiltersIsOpened] = useState(false)

    const [selectedSubcates, setSubcates] = useState([])
    const [selectedColors, setColors] = useState([])
    const [selectedMaterials, setMaterials] = useState([])
    const [filteredProducts, setFilteredProducts] = useState(products)

    const onProductsFilter = useCallback(() => {
        const filtered = products.filter(p => {
            if (selectedSubcates.length) {
                if (!selectedSubcates.includes(p.subcategories)) {
                    return false
                }
            }
            if (selectedColors.length) {
                if (!selectedColors.includes(p.color)) {
                    return false
                }
            }
            if (selectedMaterials.length) {
                if (!selectedMaterials.includes(p.material)) {
                    return false
                }
            }
            return true
        })
        setFilteredProducts(filtered)
    }, [selectedColors, selectedMaterials, selectedSubcates, products])

    useEffect(() => {
        if (products) {
            onProductsFilter()
        }
    }, [onProductsFilter, products])

    const toggleIsOpened = () => {
        setIsOpened(prevState => !prevState)
        // Fetch products if open the first time
        if (!products) {
            dispatch(fetchProductsByConcept(concept))
        }
    }

    const toggleFiltersIsOpened = () => {
        setFiltersIsOpened(prevState => !prevState)
    }

    return <Box border={1} p={2} mt={3}>
        <ConceptHeader
            concept={concept}
            isOpened={isOpened}
            filtersIsOpened={filtersIsOpened}
            toggleIsOpened={toggleIsOpened}
            toggleFiltersIsOpened={toggleFiltersIsOpened} />

        <Collapse in={isOpened} timeout="auto" unmountOnExit>
            <ProductsFilters
                selectedSubcates={selectedSubcates}
                selectedColors={selectedColors}
                selectedMaterials={selectedMaterials}
                setSubcates={setSubcates}
                setColors={setColors}
                setMaterials={setMaterials}
                filtersIsOpened={filtersIsOpened} />
            <ConceptProducts snackBarShowing={snackBarShowing} setSnackbarShowing={setSnackbarShowing} concept={concept} products={filteredProducts} />
        </Collapse>
    </Box>
}

export default Concepts