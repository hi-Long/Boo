import { Box, IconButton, Typography } from "@material-ui/core";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const SignInHeader = props => {
    const { noButtons } = props
    const dispatch = useDispatch()

    return <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} mb={4}>
        <Typography variant="h5" component="h2">
            <Box fontWeight="fontWeightMedium">
                ĐĂNG NHẬP TÀI KHOẢN
            </Box>
        </Typography>
        {!noButtons
            && <IconButton
                aria-label="close" color="primary"
                onClick={() => dispatch(uiActions.setAuthDrawerShowing(false))}>
                <CloseOutlinedIcon fontSize="medium" />
            </IconButton>
        }
    </Box>
}

export default SignInHeader