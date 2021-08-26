import { Box, Button, makeStyles } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useState } from "react";
import { useSelector } from "react-redux";
import AccountComponentLayout from "../Account/AccountComponentLayout";
import Address from "./Address";
import AddressForm from "./AddressForm";

const useStyles = makeStyles({
    button: {
        padding: "1rem"
    }
})

const DeliveryAddress = props => {
    const { setSnackbarShowing, setDeleteConfirmShowing } = props
    const delivery = useSelector(state => state.auth.user.delivery)
    const [newFormShowing, setNewFormShowing] = useState(false)
    const [, setUpdateFormShowing] = useState(false)
    const classes = useStyles()

    return <AccountComponentLayout header="Địa chỉ giao hàng">
        {!newFormShowing
            ? <Box width="100%" border={1} >
                <Button
                    className={classes.button} fullWidth
                    onClick={() => setNewFormShowing(prevState => !prevState)}>
                    <AddCircleOutlineOutlinedIcon />
                    Thêm địa chỉ mới
                </Button>
            </Box>
            : <AddressForm type="new"
                setNewFormShowing={setNewFormShowing}
                setSnackbarShowing={setSnackbarShowing} />
        }
        <Box mb={5}>
            {delivery.map(d => (
                <Address delivery={d}
                    setDeleteConfirmShowing={setDeleteConfirmShowing}
                    setUpdateFormShowing={setUpdateFormShowing}
                    setSnackbarShowing={setSnackbarShowing} />
            ))}
        </Box>
    </AccountComponentLayout>
}

export default DeliveryAddress