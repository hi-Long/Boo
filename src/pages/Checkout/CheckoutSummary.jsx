import { Box, Typography, makeStyles } from "@material-ui/core"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Confirmation from "../../components/Confirmation/Confirmation"
import OrderDetails from "../../components/OrderDetails/OrderDetails"
import { createOrder } from "../../store/checkout-actions"

const useStyles = makeStyles({
    link: {
        textDecoration: "none"
    }
})

const CheckoutSummary = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const paymentMethod = useSelector(state => state.checkout.paymentMethod)
    const delivery = useSelector(state => state.checkout.delivery.selected)
    const userId = useSelector(state => state.auth.user.id)
    const { localStorageCart, setLocalStorageCart, handleBackStep, handleNextStep } = props
    const [confirmationShowing, setConfirmationShowing] = useState(false)
    const [checkoutComplete, setCheckoutComplete] = useState(false)

    const onCheckoutConfirm = () => {
        const newOrder = {
            ...localStorageCart,
            userId,
            date: new Date().getTime(),
            paymentMethod,
            delivery,
            status: "Đơn hàng mới"
        }
        dispatch(createOrder(newOrder))
        setConfirmationShowing(false)
        setCheckoutComplete(true)
        setLocalStorageCart({ products: [], total: 0 })
        handleNextStep()
    }

    if (checkoutComplete) {
        return <Box textAlign="center">
            <Typography variant="h5" gutterBottom>Đơn hàng của bạn đã được tiếp nhận!</Typography>
            <Link to="/account/orders" className={classes.link}>Theo dõi đơn hàng</Link>
            <img src="https://cdn.dribbble.com/users/1017716/screenshots/14404808/media/e731fb54b71c807a67e031e8bd9cd48e.gif" alt="Shipping" width="100%" />
        </Box>
    }

    return <Box mb={5}>
        <OrderDetails
            handleBackStep={handleBackStep}
            onCheckout
            setConfirmationShowing={setConfirmationShowing}
            localStorageCart={localStorageCart} />

        <Confirmation
            title="Xác nhận đơn hàng"
            content="Bạn chắc chắn muốn mua hàng chứ"
            confirm="Xác nhận"
            cancel="Hủy"
            confirmActions={onCheckoutConfirm}
            confirmationShowing={confirmationShowing}
            setConfirmationShowing={setConfirmationShowing} />
    </Box>
}

export default CheckoutSummary