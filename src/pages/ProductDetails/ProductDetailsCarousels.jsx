import { Box, Typography } from "@material-ui/core"
import React, { Fragment } from "react"
import { useEffect, useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel"
import { SERVER_ROUTE_PRODUCTS } from "../../constants"
import useHttp from "../../hooks/useHttp"
import useLocalStorage from "../../hooks/useLocalStorage"

const ProductDetailsCarousel = props => {
    const { subcategory, productId } = props
    const [relevantProducts, setRelevantProducts] = useState([])
    const { makeRequest } = useHttp()
    const [seenProducts] = useLocalStorage('seen', [])

    useEffect(() => {
        const relevantProductReqConfig = {
            method: 'get',
            url: `${SERVER_ROUTE_PRODUCTS}?subcategories=${subcategory}&id_ne=${productId}&_limit=8`
        }
        const relevantProductApply = responseData => {
            setRelevantProducts(responseData)
        }
        const relevantProductRequest = async () => {
            await (makeRequest(relevantProductReqConfig, relevantProductApply))
        }
        relevantProductRequest()
    }, [makeRequest, subcategory, productId])

    const carousels = [
        { header: "SẢN PHẨM LIÊN QUAN", products: relevantProducts },
        { header: "BẠN ĐÃ XEM GẦN ĐÂY", products: seenProducts.filter(p => p.id !== productId) }
    ]

    return <Box component="section" mt={5}>
        {carousels.map(carousel => {
            const { header, products } = carousel
            const noProducts = products.length

            return (
                <Fragment key={header}>
                    <Box mb={3} mt={5}>
                        <Typography variant="h5" component="h3">{carousel.products.length !== 0 && header}</Typography>
                    </Box>
                    <ProductCarousel
                        slidesToShow={noProducts < 4 ? noProducts : 4}
                        width={noProducts < 4 && `${noProducts * 25}%`}
                        autoplay={true}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </ProductCarousel>
                </Fragment>
            )
        })}
    </Box>
}

export default React.memo(ProductDetailsCarousel)