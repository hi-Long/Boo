import { Box, Button } from "@material-ui/core"
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteOrders } from "../../store/admin-actions"
import AccountComponentLayout from "../Account/AccountComponentLayout"
import Confirmation from "../Confirmation/Confirmation"
import OrderInfo from "./OrderInfo"
import OrderProducts from "./OrderProducts"
import OrderStepper from "./OrderStepper"

/* The component is rendered in 2 page: "Account order history" and "checkout summary"
   The onAccount variable is to check if the comp is in "Account order history"
   The onCheckout variable is to check if the comp is in "checkout summary"  */

const OrderDetails = props => {
    const history = useHistory()
    const {
        onAccount, setCancelOrderSuccessShowing,
        onCheckout, localStorageCart, setConfirmationShowing,
        handleBackStep } = props
    const dispatch = useDispatch()
    const selectedOrder = useSelector(state => state.account.orderSelected)
    const [cancelConfirmationShowing, setCancelConfirmationShowing] = useState(false)

    const onCancelOrder = () => {
        dispatch(deleteOrders([selectedOrder.id]))
        setCancelConfirmationShowing(false)
        setCancelOrderSuccessShowing(true)
        history.goBack()
    }

    return <Box mt={8} mb={8} component="section">
        <AccountComponentLayout header="Thông tin đơn hàng">
            {/* TOP */}
            <OrderInfo accountPageOrder={selectedOrder} />
            {/* STEPPER */}
            {!onCheckout && <OrderStepper status={selectedOrder.status} />}
            {/* PRODUCTS */}
            <OrderProducts accountPageOrder={selectedOrder} localStorageCart={localStorageCart} />
            {/* BACK BUTTON */}
            {onCheckout &&
                <Box width="60%" display="flex" justifyContent="center" m="auto" mt={5}>
                    <Box mr={3}>
                        <Button
                            variant="contained" color="primary"
                            onClick={() => {
                                handleBackStep()
                                history.replace('/checkout/delivery')
                            }}>Quay lại</Button>
                    </Box>
                    <Button
                        variant="contained" color="secondary"
                        onClick={() => setConfirmationShowing(true)}>Xác nhận đơn hàng</Button>
                </Box>
            }
            {(onAccount && selectedOrder.status !== "Hoàn thành") && <Fragment>
                <Box display="flex" justifyContent="center" mt={5}>
                    <Button
                        variant="contained" color="primary" disableElevation
                        onClick={() => setCancelConfirmationShowing(true)}> Hủy đơn hàng</Button>
                </Box>
                <Confirmation
                    title="Huỷ đơn hàng"
                    content="Bạn chắc chắn muốn hủy đơn hàng này chứ?"
                    confirm="Tiếp tục"
                    cancel="Hủy"
                    confirmActions={onCancelOrder}
                    confirmationShowing={cancelConfirmationShowing}
                    setConfirmationShowing={setCancelConfirmationShowing} />
            </Fragment>}
        </AccountComponentLayout>
    </Box >
}

export default OrderDetails