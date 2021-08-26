import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, CardActions, IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SERVER_ROUTE_PRODUCTS } from "../../constants";
import { cartActions } from "../../store/cart-slice";

const useStyles = makeStyles({
    root: {
        position: "absolute",
        bottom: "22%",
        right: -100,
        padding: 0,
        borderTopLeftRadius: "40px",
        borderBottomLeftRadius: "40px",
        backgroundColor: "white",
        opacity: 0,
        transition: ".2s"
    },
    button: {
        borderRadius: "40px",
        "& .MuiIconButton-label": {
            width: "1.25rem",
            height: "1.25rem",
        }
    },
    visible: {
        right: 0,
        opacity: 1
    }
})

const ProductCardActions = props => {
    const { product, setSizeSnackbarShowing, localStorageCart, setLocalStorageCart, onHover } = props
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [size, setSize] = useState(null)
    const classes = useStyles()

    const onAddToCart = async event => {
        event.stopPropagation()
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

    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event, size) => {
        event.stopPropagation()
        setAnchorEl(null);
        setSize(size)
    };

    return <CardActions className={clsx(classes.root, onHover && classes.visible)}>
        {/* SIZE */}
        <Box className={classes.sizes}>
            {size ? <Button
                className={classes.button}
                onClick={handleClick}>{size}</Button>
                : <IconButton className={classes.button} aria-controls="size-menu"
                    aria-haspopup="true" onClick={handleClick}>
                    <FontAwesomeIcon icon={faRuler} width="1.25rem" height="1.25rem" />
                </IconButton>
            }
            <Menu
                id="size-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={event => handleClose(event, size)}>
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <MenuItem key={size} onClick={event => handleClose(event, size)}>{size}</MenuItem>
                ))}
            </Menu>
        </Box>
        {/* ADD TO CART */}
        <IconButton
            variant="contained"
            onClick={event => onAddToCart(event)}>
            <FavoriteBorderIcon className={classes.button} fontSize="small" />
        </IconButton>
    </CardActions>
}

export default ProductCardActions