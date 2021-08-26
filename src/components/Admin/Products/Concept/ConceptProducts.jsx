import { Box, Grid, Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import Fetching from "../../../Fetching/Fetching"
import ProductCardEditable from "../../../ProductCard/ProductCardEditable"

const ConceptProducts = props => {
    const { products, setSnackbarShowing } = props
    const conceptProductsFetching = useSelector(state => state.ui.conceptProductsFetching)

    if (conceptProductsFetching) {
        <Fetching />
    }

    return <Box width="100%" mt={3}>
        <Grid container spacing={2}>
            {(products && products.length > 0)
                ? products.map(product => {
                    return <Grid item sm={3} key={product.id}>
                        <ProductCardEditable setSnackbarShowing={setSnackbarShowing} product={product} />
                    </Grid>
                })
                : <Box textAlign="center" width="100%" mb={3}>
                    <Typography variant="h6"> Không có sản phẩm nào </Typography>
                </Box>
            }
        </Grid>
    </Box>
}

export default ConceptProducts