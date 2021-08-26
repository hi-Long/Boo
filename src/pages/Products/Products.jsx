import { Box, Grid, Typography } from "@material-ui/core"
import React, { Fragment, useState } from "react"
import { useSelector } from "react-redux"
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar"
import ProductCard from "../../components/ProductCard/ProductCard"
import ProductsLoadingCarousel from "../../components/ProductCarousel/ProductsLoadingCarousel"

const Products = props => {
    const { products, productsLayout, localStorageCart, setLocalStorageCart } = props
    const productsFetching = useSelector(state => state.ui.productsFetching)
    const [sizeSnackbarShowing, setSizeSnackbarShowing] = useState(false)

    if (productsFetching) {
        return <ProductsLoadingCarousel productsLayout={productsLayout} noProducts={12} />
    }

    return <Fragment>
        <Grid container spacing={2}>
            {(products && products.length > 0)
                ? products.map((product, i) => (
                    <Grid item sm={12 / productsLayout} key={i}>
                        <ProductCard
                            productsLayout={productsLayout}
                            product={product}
                            localStorageCart={localStorageCart}
                            setLocalStorageCart={setLocalStorageCart}
                            setSizeSnackbarShowing={setSizeSnackbarShowing}></ProductCard>
                    </Grid>
                ))
                : <Box width="100%" textAlign="center" mt={10}>
                    <Typography>Không tìm thấy sản phẩm nào!</Typography>
                </Box>
            }
        </Grid>
        {/* SIZE SNACKBAR */}
        <CustomizedSnackbar
            message="Chưa lựa chọn kích cỡ"
            severity="error"
            showing={sizeSnackbarShowing}
            setShowing={setSizeSnackbarShowing} />
    </Fragment>
}

export default React.memo(Products)