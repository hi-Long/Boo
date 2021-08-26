import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import CartItemAddedSnackbar from '../../components/Cart/CartItemAddedSnackbar/CartItemAddedSnackbar'
import PageContentLayout from '../../components/Layout/PageContentLayout'
import PageLayout from '../../components/Layout/PageLayout'
import { fetchConcepts } from '../../store/product-action'
import { fetchProductsByParams } from '../../store/search-action'
import Filters from './Filters'
import Products from './Products'

const useStyles = makeStyles({
    products: {
        transition: ".2s"
    },
    filters: {
        gap: "1rem",
        transition: ".2s"
    }
})

const ProductsPage = props => {
    const { localStorageCart, setLocalStorageCart } = props

    const dispatch = useDispatch()
    const { products, params } = useSelector(state => state.search)
    const { justAddded } = useSelector(state => state.cart)

    const [filtersIsShown, setFiltersIsShown] = useState(false)
    const [productsLayout, setProductsLayout] = useState(4)

    const subcategory = new URLSearchParams(useLocation().search).get('subcategory')
    const classes = useStyles()

    useEffect(() => {
        if (subcategory) {
            dispatch(fetchProductsByParams({ subcategory, ...params }))
        }
    }, [dispatch, params, subcategory])

    useEffect(() => {
        dispatch(fetchConcepts())
    }, [dispatch])

    const onToggleFilters = () => {
        setFiltersIsShown(prevState => !prevState)
    }

    const onToggleProductsLayout = () => {
        if (productsLayout === 2) {
            setProductsLayout(4)
        }
        else {
            setProductsLayout(2)
        }
    }

    return <Fragment>
        <Grid container>
            <Grid className={classes.products} item sm={filtersIsShown ? 9 : 12}>
                <PageLayout
                    width={filtersIsShown && "75%"}
                    localStorageCart={localStorageCart}
                    setLocalStorageCart={setLocalStorageCart}>
                    <PageContentLayout extra={{ "mt": 20 }}>
                        {/* HEADER */}
                        <Box mb={5}>
                            <Typography component="h2" variant="h5">
                                <Box mb={3} textAlign="center">{subcategory}</Box>
                            </Typography>
                            <Box className={classes.filters} display="flex" justifyContent="flex-end">
                                <Button variant="outlined" size="large">
                                    <Box
                                        fontWeight="fontWeightLight" fontSize={12}
                                        onClick={onToggleProductsLayout}>See {productsLayout}</Box>
                                </Button>
                                <Button variant="outlined" size="large">
                                    <Box fontWeight="fontWeightLight" fontSize={12}
                                        onClick={onToggleFilters}>Filters</Box>
                                </Button>
                            </Box>
                        </Box>
                        {/* MAIN */}
                        {products &&
                            <Products
                                localStorageCart={localStorageCart}
                                setLocalStorageCart={setLocalStorageCart}
                                productsLayout={productsLayout}
                                products={products}></Products>
                        }
                    </PageContentLayout>
                </PageLayout >
            </Grid>
            <Grid
                className={classes.filters} item
                sm={filtersIsShown ? 3 : "auto"}>
                <Filters
                    onToggleFilters={onToggleFilters}
                    show={filtersIsShown}></Filters>
            </Grid>
        </Grid >
        <CartItemAddedSnackbar product={justAddded} />
    </Fragment >
}

export default ProductsPage