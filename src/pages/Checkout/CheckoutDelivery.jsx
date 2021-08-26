import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Confirmation from "../../components/Confirmation/Confirmation"
import CustomizeSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar"
import DeliveryAddress from "../../components/DeliveryAddress/DeliveryAddress"
import { createDelivery } from "../../store/checkout-actions"
import { checkoutActions } from "../../store/checkout-slice"

const CheckoutDelivery = props => {
    const dispatch = useDispatch()
    const { handleNextStep, handleBackStep } = props
    const user = useSelector(state => state.auth.user)
    const deleteDelivery = useSelector(state => state.checkout.delivery.delete)
    const selectedDelivery = useSelector(state => state.checkout.delivery.selected)
    const paymentMethod = useSelector(state => state.checkout.paymentMethod)
    const history = useHistory()
    const [snackbarShowing, setSnackbarShowing] = useState(false)
    const [errorSnackbarShowing, setErrorSnackbarShowing] = useState(false)
    const [deleteConfirmShowing, setDeleteConfirmShowing] = useState(false)

    const onDeleteDelivery = () => {
        const updatedDelivery = {
            ...user,
            delivery: user.delivery.filter(d => d.id !== deleteDelivery)
        }
        dispatch(createDelivery(updatedDelivery))
        setSnackbarShowing(true)
    }

    const onBackButtonClicked = () => {
        handleBackStep()
        history.replace('/checkout/auth')
    }

    const onNextButtonClicked = () => {
        if (paymentMethod && selectedDelivery) {
            handleNextStep()
            history.push('/checkout/summary')
        } else {
            setErrorSnackbarShowing(true)
        }
    }

    const paymentMethods = [
        "Thanh toán qua thẻ ATM nội địa, Visa, Master card",
        "Thanh toán qua MOMO",
        "Thanh toán khi nhận hàng"
    ]

    return <Box mb={5}>
        <DeliveryAddress
            setSnackbarShowing={setSnackbarShowing}
            setDeleteConfirmShowing={setDeleteConfirmShowing}
        />
        {/* DELIVERY METHOD */}
        <FormControl component="fieldset">
            <Typography variant="h6" component="h3">
                <Box fontWeight="fontWeightRegular" mt={4} mb={2}>
                    Hình thức thanh toán:
                </Box>
            </Typography>
            <Box border={1} width="186.5%" p={2}>
                <RadioGroup
                    onChange={event => dispatch(checkoutActions.setPaymentMethod(event.target.value))}
                    value={paymentMethod}
                    aria-label="payment-method" name="payment-method">
                    {paymentMethods.map(pm => (
                        <FormControlLabel
                            value={pm} control={<Radio />}
                            label={pm} />
                    ))}
                </RadioGroup>
            </Box>
        </FormControl>
        {/* ACTION BUTTONS */}
        <Box width="100%" mt={3} display="flex" justifyContent="space-evenly">
            <Button
                variant="contained" color="primary"
                onClick={onBackButtonClicked}>Quay lại</Button>
            <Button variant="contained" color="secondary"
                onClick={onNextButtonClicked}>Tiếp tục</Button>
        </Box>
        {/* SNACKBARS */}
        <CustomizeSnackbar
            showing={errorSnackbarShowing}
            message="Thiếu thông tin thanh toán!"
            severity="error"
            setShowing={setErrorSnackbarShowing} />
        {/* SNACKBARS */}
        <CustomizeSnackbar
            showing={snackbarShowing}
            message="Thay đổi thành công"
            severity="success"
            setShowing={setSnackbarShowing} />
        {/* DELETE CONFIRMATION */}
        <Confirmation
            title="Xóa địa chỉ"
            content="Bạn chắc chắn muốn xóa chứ"
            confirm="Xác nhận"
            cancel="Hủy"
            confirmActions={onDeleteDelivery}
            confirmationShowing={deleteConfirmShowing}
            setConfirmationShowing={setDeleteConfirmShowing}
        />
    </Box>
}

export default CheckoutDelivery