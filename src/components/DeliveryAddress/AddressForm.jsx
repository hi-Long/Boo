import { Box, Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core"
import { useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uuid as v4 } from "uuidv4"
import { CHECKOUT_PAGE_DELIVERY_ADDRESS_INPUT, CHECKOUT_PAGE_DELIVERY_NAME_INPUT, CHECKOUT_PAGE_DELIVERY_PHONE_INPUT } from "../../constants"
import { createDelivery } from "../../store/checkout-actions"
import { formInitialState, formReducer } from './AddressReducer'

const formElements = [
    {
        id: "name",
        label: "Họ tên", actionType: CHECKOUT_PAGE_DELIVERY_NAME_INPUT,
        grid: 6,
        inputProps: { minLength: 2 }
    },
    {
        id: "phone",
        label: "Số điện thoại",
        actionType: CHECKOUT_PAGE_DELIVERY_PHONE_INPUT,
        grid: 6,
        inputProps: { pattern: "[0-9]{10}" }
    },
    {
        id: "address",
        label: "Địa chỉ",
        actionType: CHECKOUT_PAGE_DELIVERY_ADDRESS_INPUT,
        grid: 12,
        inputProps: { minLength: 8 }
    }
]

const useStyles = makeStyles({
    root: {
        width: "96.3%",
        marginTop: "1rem",
        padding: "1rem",
        gap: "2rem"
    }
})

const AddressForm = props => {
    const { initialState, setNewFormShowing, setUpdateFormShowing, type, setSnackbarShowing } = props
    const [formState, formDispatch] = useReducer(formReducer, formInitialState, () => initialState ? initialState : formInitialState)
    const checkoutDispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const classes = useStyles()

    let setShowing, title, confirmButton
    switch (type) {
        case 'new':
            title = "Địa chỉ mới"
            setShowing = setNewFormShowing
            confirmButton = "THÊM MỚI"
            break
        case 'update':
            title = 'Thay đổi địa chỉ'
            setShowing = setUpdateFormShowing
            confirmButton = "THAY ĐỔI"
            break
        default: break
    }

    const onNewDeliverySubmit = () => {
        const newDelivery = {
            id: v4(),
            name: formState.name.value,
            phone: formState.phone.value,
            address: formState.address.value
        }
        const newUserInfo = {
            ...user,
            delivery: [newDelivery, ...user.delivery]
        }
        checkoutDispatch(createDelivery(newUserInfo))
        setSnackbarShowing(true)
        setNewFormShowing(false)
    }

    const onUpdateDeliverySubmit = () => {
        const updateDelivery = user.delivery.map(d => {
            if (d.id === initialState.id) {
                return {
                    id: initialState.id,
                    name: formState.name.value,
                    phone: formState.phone.value,
                    address: formState.address.value
                }
            }
            return d
        })
        const newUserInfo = {
            ...user,
            delivery: updateDelivery
        }
        checkoutDispatch(createDelivery(newUserInfo))
        setSnackbarShowing(true)
        setUpdateFormShowing(false)
    }

    const onFormSubmit = event => {
        event.preventDefault()
        switch (type) {
            case "new":
                onNewDeliverySubmit()
                break
            case "update":
                onUpdateDeliverySubmit()
                break
            default:
                break
        }
    }

    return <Box className={classes.root} border={1}>
        <header>
            <Box my={2} color="gray">
                <Typography variant="h5" component="h3">{title}</Typography>
            </Box>
        </header>
        <form
            id="delivery-form"
            width="100%" display="flex" border={1} mt={2}
            onSubmit={event => onFormSubmit(event)}>
            <Grid container spacing={4}>
                {/* NAME */}
                {formElements.map(el => (
                    <Grid item sm={el.grid}>
                        <TextField
                            required id={el.id} label={el.label}
                            defaultValue={formState[el.id].value}
                            onChange={event => formDispatch({ type: el.actionType, payload: event.target.value })}
                            fullWidth />
                    </Grid>
                ))}
                <Grid item sm={6}>
                    <Button
                        variant="outlined" fullWidth disableElevation
                        onClick={() => setShowing(false)}>HỦY BỎ</Button>
                </Grid>
                <Grid item sm={6}>
                    <Button type="submit" variant="contained" color="secondary" fullWidth disableElevation>{confirmButton}</Button>
                </Grid>
            </Grid>
            {/* BUTTON */}
        </form >
    </Box>
}

export default AddressForm