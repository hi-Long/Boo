import { Grid } from "@material-ui/core"
import ProductCardLoading from "../ProductCard/ProductCardLoading"

const ProductsLoadingCarousel = props => {
    const { noProducts, productsLayout } = props

    return <Grid container spacing={6}>
        {[...Array(noProducts).keys()].map(i => (
            <Grid item sm={12 / productsLayout} key={i}>
                <ProductCardLoading key={i} />
            </Grid>
        ))}
    </Grid>
}

export default ProductsLoadingCarousel