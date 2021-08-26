import { Box, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import PageContentLayout from "../../../components/Layout/PageContentLayout"
import ProductCarousel from "../../../components/ProductCarousel/ProductCarousel"
import { SERVER_ROUTE_PRODUCTS } from "../../../constants"
import useHttp from "../../../hooks/useHttp"
import useLocalStorage from "../../../hooks/useLocalStorage"
import ProductCard from "../../../components/ProductCard/ProductCard"
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar"

const HomepageCarousels = props => {
    const { localStorageCart, setLocalStorageCart } = props
    const { makeRequest } = useHttp()
    const [bestsellers, setBestsellers] = useState([])
    const [seenProducts] = useLocalStorage('seen', { seen: [] })
    const [sizeSnackbarShowing, setSizeSnackbarShowing] = useState(false)

    useEffect(() => {
        const requestConfig = {
            method: 'get',
            url: `${SERVER_ROUTE_PRODUCTS}?_sort=click&_order=desc&_limit=8`
        }
        const applyData = responseData => {
            setBestsellers(responseData)
        }
        const request = async () => {
            await makeRequest(requestConfig, applyData)
        }
        request()
    }, [makeRequest])

    return <PageContentLayout>
        {/* BESTSELLER */}
        <Box mt={10}>
            <Typography variant="h5" component="h2">
                <Box mb={5} width="100%" textAlign="center">SẢN PHẨM TRENDING</Box>
            </Typography>
            <ProductCarousel
                slidesToShow={bestsellers.length < 4 ? bestsellers.length : 4}
                width={bestsellers.length <= 4 && `${bestsellers.length * 25}% `}
                autoplay={true}>
                {bestsellers.map(product => (
                    <ProductCard
                        product={product}
                        setSizeSnackbarShowing={setSizeSnackbarShowing}
                        localStorageCart={localStorageCart}
                        setLocalStorageCart={setLocalStorageCart} />
                ))}
            </ProductCarousel>
        </Box>

        {seenProducts.length &&
            <Box mt={10}>
                <Typography variant="h5" component="h2">
                    <Box mb={5} width="100%" textAlign="center">SẢN PHẨM ĐÃ XEM</Box>
                </Typography>
                <ProductCarousel
                    slidesToShow={seenProducts.length < 4 ? seenProducts.length : 4}
                    width={seenProducts.length < 4 && `${seenProducts.length * 25}% `}
                    autoplay={true}>
                    {seenProducts.map((product, i) => (
                        <ProductCard
                            key={i}
                            product={product}
                            localStorageCart={localStorageCart}
                            setLocalStorageCart={setLocalStorageCart} />
                    ))}
                </ProductCarousel>
            </Box>
        }
        {/* SIZE SNACKBAR */}
        <CustomizedSnackbar
            message="Chưa lựa chọn kích cỡ"
            severity="error"
            showing={sizeSnackbarShowing}
            setShowing={setSizeSnackbarShowing} />
    </PageContentLayout >
}

export default HomepageCarousels