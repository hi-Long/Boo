import { Box, Button, CircularProgress } from "@material-ui/core"
import useAuth from "../../../../firebase/useAuth"

const AccountManagementFooter = props => {
    const { logout, loading } = useAuth()

    const onLogoutHandler = async () => {
        try {
            await logout()
        } catch (err) {
            console.log(err)
        }
    }

    return <Button
        variant="outlined" fullWidth size="large"
        onClick={onLogoutHandler}>
        {loading ? <CircularProgress color="primary" /> : <Box py={1}>ĐĂNG XUẤT</Box>}
    </Button>
}

export default AccountManagementFooter