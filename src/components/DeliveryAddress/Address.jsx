import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddressForm from "./AddressForm"
import { checkoutActions } from "../../store/checkout-slice"
import clsx from "clsx"

const useStyles = makeStyles({
    root: {
        padding: ".5rem",
        gap: ".5rem",
        transition: ".2s",
        cursor: "pointer"
    },
    selected: {
        background: "#b9f6ca"
    }
})

const Address = props => {
    const dispatch = useDispatch()
    const { delivery, setSnackbarShowing, setDeleteConfirmShowing } = props
    const selectedDelivery = useSelector(state => state.checkout.delivery.selected)
    const classes = useStyles()
    const [updateFormShowing, setUpdateFormShowing] = useState(false)

    const onDeleteButtonClick = () => {
        dispatch(checkoutActions.setDeleteDelivery(delivery.id))
        setDeleteConfirmShowing(true)
    }

    // If on UPDATING, render FORM
    if (updateFormShowing) {
        return <AddressForm
            type="update"
            setUpdateFormShowing={setUpdateFormShowing}
            setSnackbarShowing={setSnackbarShowing}
            initialState={{
                id: delivery.id,
                name: { value: delivery.name },
                phone: { value: delivery.phone },
                address: { value: delivery.address }
            }} />
    }

    // If NOT on UPDATING, render delivery component
    return <Box
        className={clsx(classes.root, (selectedDelivery && selectedDelivery.id) === delivery.id && classes.selected)}
        display="flex" border={1} mt={2}
        onClick={() => dispatch(checkoutActions.setSelectedDelivery(delivery))}>
        <Box flexGrow={1}>
            <Typography variant="subtitle2" component="p" gutterBottom>{delivery.name}</Typography>
            <Typography variant="subtitle1" component="p">Địa chỉ: {delivery.address}</Typography>
            <Typography variant="subtitle1" component="p">Số điện thoại: {delivery.phone}</Typography>
        </Box>
        <Box display="flex" alignItems="flex-start" justifyContent="flex-end">
            <Button onClick={() => setUpdateFormShowing(true)}>
                <Typography variant="subtitle2" component="span">
                    <Box fontSize={10}>
                        Chỉnh sửa
                    </Box>
                </Typography>
            </Button>
            <Button>
                <Typography variant="subtitle2" component="span">
                    <Box fontSize={10} onClick={onDeleteButtonClick}>Xóa</Box>
                </Typography>
            </Button>
        </Box>
    </Box>
}

export default Address