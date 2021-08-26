import { Box, Typography, makeStyles, Button, Divider } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { uiActions } from "../../../../store/ui-slice"
import ProductDetailsModal from "./ProductDetailsModal"
import clsx from 'clsx'

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        gap: "1rem"
    },
    desc: {
        whiteSpace: "break-spaces"
    },
    button: {
        paddingLeft: 0
    },
    gray: {
        fontSize: 12,
        color: "dimgray"
    }
})

const ProductDetailsSpecs = props => {
    const { product } = props
    const dispatch = useDispatch()
    const classes = useStyles()

    const toggleDetailsModal = value => {
        dispatch(uiActions.setDetailsModalShowing(value))
    }

    return <Box className={classes.root} mt={3}>
        <Box>
            <Typography variant="body1" component="h2" gutterBottom>
                <Box fontWeight="fontWeightMedium">Mô tả sản phẩm</Box>
            </Typography>
            <Typography
                className={classes.gray}
                variant="body2" component="span">Mã sản phẩm: {product.id} </Typography>
        </Box>
        <Typography variant="body2"
            className={clsx(classes.desc, classes.gray)}>
            {product.description}
        </Typography>
        <Button className={classes.button} onClick={() => toggleDetailsModal(true)}>Thông tin chi tiết & Bảo quản</Button>
        <ProductDetailsModal product={product}></ProductDetailsModal>
        <Divider />
    </Box>
}

export default ProductDetailsSpecs