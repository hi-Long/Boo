import { Box, IconButton, Typography } from "@material-ui/core";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../store/ui-slice";

const AccountManagementHeader = props => {
    const dispatch = useDispatch()

    return <Box display="flex" justifyContent="space-between" alignItems="center" py={2} component="header">
        <Typography variant="h5" component="h2">
            <Box fontWeight="fontWeightLight">
                XIN CHÀO HẢI LONG NGUYỄN
            </Box>
        </Typography>
        <IconButton
            aria-label="delete" color="primary"
            onClick={() => dispatch(uiActions.setAuthDrawerShowing(false))}>
            <CloseOutlinedIcon fontSize="medium" />
        </IconButton>
    </Box>
}

export default AccountManagementHeader