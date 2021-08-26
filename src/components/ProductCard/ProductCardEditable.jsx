import { Box, Card, CardActionArea, makeStyles } from "@material-ui/core"
import { Fragment, useState } from "react"
import ProductModal from "../Admin/Products/ProductModal/ProductModal"
import ProductImage from "./CardMedia"
import ProductCardContent from "./ProductCardContent"

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
    media: {
        height: 250,
    },
})

const ProductCardEditable = props => {
    const { product, setSnackbarShowing } = props
    const [productModalShowing, setProductModalShowing] = useState(false)

    const onProductModalClose = () => {
        setProductModalShowing(false)
    }

    const classes = useStyles()

    return <Fragment>
        <Box p={.5}>
            <Card className={classes.root}
                onClick={() => setProductModalShowing(true)}>
                <CardActionArea>
                    <ProductImage image={product.images[0].url} height={600} />
                    <ProductCardContent name={product.name} price={product.price} />
                </CardActionArea>
            </Card>
        </Box>

        {product && <ProductModal
            setSnackbarShowing={setSnackbarShowing}
            type="update"
            setProductModalShowing={setProductModalShowing}
            initialState={{ ...product, price: product.price / 1000 }}
            productModalShowing={productModalShowing}
            onProductModalClose={onProductModalClose} />}
    </Fragment>
}

export default ProductCardEditable