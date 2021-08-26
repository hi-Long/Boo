import { Box, makeStyles, Typography } from "@material-ui/core"
import LocalShippingTwoToneIcon from '@material-ui/icons/LocalShippingTwoTone';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        gap: "1rem",
        padding: "1.5rem 2rem",
        border: "1px solid lightgray",
        borderRadius: 2
    }
})

const ProductDetailsDelivery = props => {
    const classes = useStyles()

    return <Box mt={3}>
        <Typography variant="body1" component="h2" gutterBottom>
            <Box fontWeight="fontWeightMedium">Giao hàng</Box>
        </Typography>
        <Box className={classes.root} mt={3}>
            <LocalShippingTwoToneIcon fontSize="large" />
            <Typography variant="body2" component="span">Free ship đơn hàng trên 299.000đ</Typography>
        </Box>
        <Typography variant="body2" component="span">
            <Box textAlign="center" mt={2}>Chính sách giao hàng có thể thay đổi khi áp dụng chương trình khuyến mãis</Box>
        </Typography>
    </Box>
}

export default ProductDetailsDelivery