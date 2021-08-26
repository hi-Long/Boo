import { Box, Grid } from "@material-ui/core"

const ProductDetailsImages = props => {
    const { images } = props
    return <Box mr={5}>
        <Grid container spacing={1}>
            {images.map((img, i) => (
                <Grid item sm={6} key={i}>
                    <img
                        src={img.url}
                        alt="Product"
                        width="100%"
                        height="auto" />
                </Grid>
            ))}
        </Grid>
    </Box>
}

export default ProductDetailsImages