import { Box, Grid, IconButton, makeStyles } from "@material-ui/core"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch, useHistory } from "react-router-dom"
import OrderHistory from "../../components/Account/OrderHistory"
import PersonalInfo from "../../components/Account/PersonalInfo"
import Confirmation from "../../components/Confirmation/Confirmation"
import CustomizedSnackbar from "../../components/CustomizedSnackbar/CustomizedSnackbar"
import DeliveryAddress from "../../components/DeliveryAddress/DeliveryAddress"
import Logo from '../../components/Logo/Logo'
import { createDelivery } from "../../store/checkout-actions"
import AccountPageNav from "./AccountPageNav"
import ChangePassword from "./components/ChangePassword/ChangePassword"

const useStyles = makeStyles({
    root: { height: "92vh" }
})

const AccountPage = props => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    const deleteDelivery = useSelector(state => state.checkout.delivery.delete)
    const [snackbarShowing, setSnackbarShowing] = useState(false)
    const [deleteConfirmShowing, setDeleteConfirmShowing] = useState(false)
    const classes = useStyles()

    const onDeleteDelivery = () => {
        const updatedDelivery = {
            ...user,
            delivery: user.delivery.filter(d => d.id !== deleteDelivery)
        }
        dispatch(createDelivery(updatedDelivery))
        setSnackbarShowing(true)
    }

    return <Fragment>
        <Grid container className={classes.root}>
            <Grid item sm={9}>
                <Box component="nav" display="flex" alignItems="center" pt={2} pb={5}>
                    <IconButton onClick={() => history.goBack()}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Box width="100%" justifySelf="center">
                        <Logo></Logo>
                    </Box>
                </Box>
                <Box width="75%" m="auto">
                    <Switch>
                        <Route path={`/account/personal-info`} render={() => <PersonalInfo />} />
                        <Route path={`/account/orders`} render={() => <OrderHistory />} />
                        <Route path={`/account/delivery`} render={() => <DeliveryAddress
                            setSnackbarShowing={setSnackbarShowing}
                            setDeleteConfirmShowing={setDeleteConfirmShowing} />} />
                        <Route path={`/account/password`} render={() => <ChangePassword />} />
                    </Switch>
                </Box>
            </Grid>
            <Grid item sm={3}>
                <AccountPageNav />
            </Grid>

        </Grid>

        {/* SNACKBARS */}
        <CustomizedSnackbar
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
            setConfirmationShowing={setDeleteConfirmShowing} />
    </Fragment>
}

export default AccountPage
