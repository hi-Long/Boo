import { Box, Breadcrumbs, Grid, Typography } from "@material-ui/core"
import { Fragment } from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import CartItemAddedSnackbar from "../../components/Cart/CartItemAddedSnackbar/CartItemAddedSnackbar"
import PageContentLayout from "../../components/Layout/PageContentLayout"
import PageLayout from "../../components/Layout/PageLayout"
import { SERVER_ROUTE_PRODUCTS } from "../../constants"
import useHttp from "../../hooks/useHttp"
import ProductDetails from "./ProductDetails"
import ProductDetailsCarousel from "./ProductDetailsCarousels"
import ProductDetailsImages from "./ProductDetailsImages"

const ProductDetailsPage = props => {
    const { localStorageCart, setLocalStorageCart } = props
    const { id } = useParams()
    const { justAddded } = useSelector(state => state.cart)

    const { makeRequest } = useHttp()
    const [product, setProduct] = useState()

    useEffect(() => {
        const reqConfig = {
            method: 'get',
            url: SERVER_ROUTE_PRODUCTS + '/' + id
        }
        const applyData = responseData => {
            setProduct(responseData)
        }
        const request = async () => {
            await makeRequest(reqConfig, applyData)
        }
        request()
    }, [id, makeRequest])

    return <PageLayout localStorageCart={localStorageCart}
        setLocalStorageCart={setLocalStorageCart}>
        <main style={{ marginBottom: "5rem" }} >
            <PageContentLayout>
                {product && <Fragment>
                    <Box mt={8} mb={5} boxSizing="border-box">
                        <Breadcrumbs>
                            <Link color="inherit" to="/"> Trang chủ </Link>
                            <Typography color="textPrimary">{product.subcategories}</Typography>
                        </Breadcrumbs>
                    </Box>
                    <Grid container>
                        <Grid item sm={9}>
                            <ProductDetailsImages images={product.images} />
                        </Grid>
                        <Grid item sm={3}>
                            <ProductDetails
                                product={product}
                                localStorageCart={localStorageCart}
                                setLocalStorageCart={setLocalStorageCart} />
                        </Grid>
                    </Grid>
                    <ProductDetailsCarousel productId={id} subcategory={product.subcategories} />
                </Fragment>
                }
            </PageContentLayout>
        </main>
        <CartItemAddedSnackbar product={justAddded} />
    </PageLayout>
}

export default ProductDetailsPage