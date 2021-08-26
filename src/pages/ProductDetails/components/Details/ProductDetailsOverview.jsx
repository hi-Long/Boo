import { Box, Button, Divider, makeStyles, Typography } from "@material-ui/core";
import StraightenIcon from '@material-ui/icons/Straighten';
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomizedSnackbar from "../../../../components/CustomizedSnackbar/CustomizedSnackbar";
import FormattedPrice from "../../../../components/FormattedPrice/FormattedPrice";
import { SERVER_ROUTE_PRODUCTS } from "../../../../constants";
import { cartActions } from "../../../../store/cart-slice";
import { uiActions } from "../../../../store/ui-slice";
import SizeDrawer from "../SizeDrawer";

const useStyles = makeStyles((theme) => ({
    root: {
        gap: theme.spacing(3)
    },
    "size-table": {
        width: "fit-content"
    },
}));

const ProductDetailsOverview = props => {
    const { product, localStorageCart, setLocalStorageCart } = props
    const dispatch = useDispatch()
    const classes = useStyles()
    const [size, setSize] = useState("S")
    const [sizeSnackbarShowing, setSizeSnackbarShowing] = useState(false)

    const toggleSizeDrawer = value => {
        dispatch(uiActions.setSizeDrawerShowing(value))
    }

    const onAddToCart = async () => {
        if (size) {
            let itemExist = false
            let { products, total } = localStorageCart
            // Check if item exist
            for (let storedProduct of products) {
                if (storedProduct.item.id === product.id && storedProduct.item.size === size) {
                    // If existed, increase its quantity
                    storedProduct.quantity++
                    total += product.price
                    itemExist = true
                    break
                }
            }
            // If item does not exist, add it.
            if (!itemExist) {
                products.push({ item: { ...product, size }, quantity: 1 })
                total += product.price

                // Update the number of added to cart for the product
                const updatedProduct = { ...product, added: product.added + 1 }
                try {
                    await axios.put(`${SERVER_ROUTE_PRODUCTS}/${product.id}`, updatedProduct)
                } catch (err) {
                    console.log(err)
                }
            }
            // Save to local cart
            setLocalStorageCart({ products, total })

            // Show added success snackbar
            dispatch(cartActions.setJustAdded({ ...product, size }))
            setTimeout(() => {
                dispatch(cartActions.setJustAdded(null))
            }, 3000)
        }
        else {
            setSizeSnackbarShowing(true)
        }
    }

    return <Box className={classes.root} display="flex" flexDirection="column">
        <Box>
            <Typography variant="h5" component="h1">{product.name}</Typography>
            <Typography variant="h6" component="span">
                <Box fontWeight="fontWeightLight">
                    <FormattedPrice price={product.price} />
                </Box>
            </Typography>
        </Box>
        <Button
            className={classes["size-table"]}
            variant="contained"
            color="primary"
            onClick={() => toggleSizeDrawer(true)}
            startIcon={<StraightenIcon />}>
            Kích cỡ
        </Button>
        <SizeDrawer></SizeDrawer>
        <Box display="flex" justifyContent="space-between">
            {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                <Button
                    className={classes.s}
                    key={s}
                    color="primary"
                    variant={size === s ? "contained" : "outlined"}
                    size="medium"
                    onClick={() => setSize(s)}>{s}</Button>
            ))}
        </Box>
        <Button
            variant="contained"
            color="secondary"
            size="large"
            disableElevation
            onClick={onAddToCart}>THÊM VÀO GIỎ</Button>
        <Divider />
        {/* SIZE SNACKBAR */}
        <CustomizedSnackbar
            message="Chưa lựa chọn kích cỡ"
            severity="error"
            showing={sizeSnackbarShowing}
            setShowing={setSizeSnackbarShowing} />
    </Box>
}

export default ProductDetailsOverview