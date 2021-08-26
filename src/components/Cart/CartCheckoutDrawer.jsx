import { Drawer, makeStyles } from "@material-ui/core"
import CartDrawerHeader from "./CartDrawerHeader"
import CartDrawerProducts from "./CartDrawerProducts"
import CartDrawerSummary from "./CartDrawerSummary"

const useStyles = makeStyles({
    root: {
        "& .MuiDrawer-paper": {
            width: "28%",
            padding: "0"
        }
    }
})

const CartCheckoutDrawer = props => {
    const { localStorageCart, setLocalStorageCart } = props
    const classes = useStyles()

    return <Drawer
        className={classes.root}
        display="flex"
        anchor="right"
        variant="permanent">
        <CartDrawerHeader noButtons noItems={localStorageCart.products.length} />
        <CartDrawerProducts
            localStorageCart={localStorageCart}
            setLocalStorageCart={setLocalStorageCart} />
        <CartDrawerSummary noButtons total={localStorageCart.total} />
    </Drawer>
}

export default CartCheckoutDrawer