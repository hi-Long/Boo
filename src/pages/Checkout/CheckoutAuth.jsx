import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core"
import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Auth from "../../components/Auth/Auth"
import useAuth from "../../firebase/useAuth"

const useStyles = makeStyles({
    button: {
        width: "50%",
        margin: "auto",
        marginBottom: "2rem"
    }
})

const CheckoutAuth = props => {
    const { handleNextStep } = props
    const { logout } = useAuth()
    const history = useHistory()
    const isAuth = useSelector(state => state.auth.isAuth)
    const userFetching = useSelector(state => state.ui.userFetching)
    const classes = useStyles()

    const onContinueClicked = () => {
        handleNextStep()
        history.push('/checkout/delivery')
    }

    if (userFetching) {
        return <Box width="100%" display="flex" justifyContent="center" mt={10}>
            <CircularProgress />
        </Box>
    }

    return <Box mt={5}>
        {(!isAuth && !userFetching)
            ? <Auth onCheckout={true} noButtons />
            :
            <Box display="flex" flexDirection="column">
                <Button
                    className={classes.button} variant="contained"
                    color="primary" size="large" disableElevation
                    onClick={async () => await logout()}>Đăng nhập bằng tài khoản khác</Button>
                <Button
                    className={classes.button} variant="contained"
                    color="secondary" size="large" disableElevation
                    onClick={onContinueClicked}>Tiếp tục</Button>
            </Box>
            // { authOptionsComp }
        }
    </Box>
}

export default React.memo(CheckoutAuth)