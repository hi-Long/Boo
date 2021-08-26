import { Box, IconButton, Typography } from "@material-ui/core"
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const SignUpHeader = props => {
    const { handleTabChange, setAccountManagementDrawerIsOpen } = props

    return <Box display="flex" justifyContent="space-between" alignItems="center" pt={2} mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <IconButton
                aria-label="delete" color="default"
                id="simple-tab-1"
                aria-controls="simple-tabpanel-1"
                variant="outlined"
                onClick={() => handleTabChange(0)}
            >
                <ArrowBackIosOutlinedIcon />
            </IconButton>
            <Typography variant="h5" component="h2">
                <Box fontWeight="fontWeightMedium"> TẠO TÀI KHOẢN </Box>
            </Typography>
        </Box>
        <IconButton
            aria-label="delete" color="default"
            onClick={() => setAccountManagementDrawerIsOpen(false)}
        >
            <CloseOutlinedIcon fontSize="medium" />
        </IconButton>
    </Box >
}

export default SignUpHeader