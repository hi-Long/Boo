import { Box, Card, CardActionArea, Divider, makeStyles } from "@material-ui/core"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { SERVER_ROUTE_PRODUCTS } from "../../constants"
import ProductImage from "./CardMedia"
import ProductCardActions from "./ProductCardActions"
import ProductCardContent from "./ProductCardContent"
import useLocalStorage from "../../hooks/useLocalStorage"
import { useState } from "react"

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "relative",

        "&:hover": {
            ".MuiCardActions-root": {
                background: "red"
            }
        }
    },
    media: { height: 250 }
})

const ProductCard = props => {
    const { product, localStorageCart, setLocalStorageCart, setSizeSnackbarShowing, productsLayout } = props
    const history = useHistory()
    const classes = useStyles()
    const [seenProducts, setSeenProducts] = useLocalStorage('seen', { seen: [] })
    const [onHover, setOnHover] = useState(false)

    const onCardClicked = async () => {
        const updatedProduct = { ...product, click: product.click + 1 }
        try {
            await axios.put(`${SERVER_ROUTE_PRODUCTS}/${product.id}`, updatedProduct)
        } catch (err) {
            console.log(err)
        }
        if (!seenProducts.find(p => p.id === product.id)) {
            setSeenProducts([product, ...seenProducts])
        }
        history.push(`/products/${product.id}`)
    }

    return <Box p={.5}>
        <Card
            className={classes.root}
            onClick={onCardClicked}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}>
            <CardActionArea>
                {!onHover
                    ? <ProductImage
                        image={product && product.images[0].url}
                        height={productsLayout === 2 ? 800 : 500} />
                    : <ProductImage
                        image={product && product.images[1].url}
                        height={productsLayout === 2 ? 800 : 500} />
                }
                <Divider />
                <ProductCardContent name={product.name} price={product.price} />
            </CardActionArea>
            <ProductCardActions
                onHover={onHover}
                className={classes.actions}
                product={product}
                localStorageCart={localStorageCart}
                setLocalStorageCart={setLocalStorageCart}
                setSizeSnackbarShowing={setSizeSnackbarShowing} />
        </Card>
    </Box>
}

export default ProductCard