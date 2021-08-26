import { Box, Grid, Typography } from "@material-ui/core"
import FormattedPrice from "../../../../components/FormattedPrice/FormattedPrice"

const DetailsModalTabLayout = props => {
    const { image, price, name } = props
    return <Box>
        <Grid container spacing={5}>
            <Grid item sm={4}>
                <Box mb={2}>
                    <img
                        src={image}
                        alt="Product"
                        width="100%" />
                </Box>
                <Typography variant="body2" component="h5" gutterBottom>{name}</Typography>
                <Typography variant="body2" component="h5">
                    <FormattedPrice price={price} />
                </Typography>
            </Grid>
            <Grid item sm={8}>
                {props.children}
            </Grid>
        </Grid>
    </Box>
}

export default DetailsModalTabLayout