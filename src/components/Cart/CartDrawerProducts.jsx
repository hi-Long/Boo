import { Box, List, makeStyles, Typography } from "@material-ui/core"
import CartItem from "./CartItem/CartItem"

const useStyles = makeStyles({
    root: {
        backgroundColor: "#fcfcfca8"
    }
})

const CartDrawerProducts = props => {
    const { localStorageCart, setLocalStorageCart, onDeleteIconClicked } = props
    const classes = useStyles()

    return <Box className={classes.root} px={2} pt={2} flexGrow={1} overflow="auto">
        <List>
            {localStorageCart
                ? localStorageCart.products.length
                    ? localStorageCart.products.map(product => (
                        <CartItem
                            key={product.item.id}
                            onDeleteIconClicked={onDeleteIconClicked}
                            localStorageCart={localStorageCart}
                            setLocalStorageCart={setLocalStorageCart} product={product} />
                    ))
                    : <Box textAlign="center" mt={5}>
                        <Typography variant="h6" component="span"> Không có sản phẩm nào trong giỏ &#128532;</Typography>
                    </Box>
                : null
            }

        </List>
    </Box>
}

export default CartDrawerProducts