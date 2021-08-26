import { Box } from "@material-ui/core"
import ProductDetailsDelivery from "./components/Details/ProductDetailsDelivery"
import ProductDetailsOverview from "./components/Details/ProductDetailsOverview"
import ProductDetailsSpecs from "./components/Details/ProductDetailsSpecs"

const ProductDetails = props => {
    const { product, localStorageCart, setLocalStorageCart } = props

    return <Box>
        <ProductDetailsOverview
            product={product}
            localStorageCart={localStorageCart}
            setLocalStorageCart={setLocalStorageCart} />
        <ProductDetailsSpecs product={product} />
        <ProductDetailsDelivery />
    </Box>
}

export default ProductDetails