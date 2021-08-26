import { Box, Button, Grid, makeStyles } from "@material-ui/core"
import { useReducer } from "react"
import AccountComponentLayout from "../../../components/Account/AccountComponentLayout"
import PasswordInput from "../../../components/UI/InputPassword"
import { ACCOUNT_PAGE_RESET_PASSWORD_CURRENT_INPUT, ACCOUNT_PAGE_RESET_PASSWORD_NEW_INPUT, ACCOUNT_PAGE_RESET_PASSWORD_RETYPED_INPUT } from "../../../constants"
import { formInitialState, formReducer } from "./ChangePassword/ChangePasswordReducer"

const useStyles = makeStyles({
    root: {
        width: "60%",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        margin: "auto",
        padding: ".5rem"
    },
    button: {
        borderRadius: 0
    }
})

const inputs = [
    { name: "currentPassword", label: "Nhập mật khẩu cũ", actionType: ACCOUNT_PAGE_RESET_PASSWORD_CURRENT_INPUT },
    { name: "newPassword", label: "Nhập mật khẩu mới", actionType: ACCOUNT_PAGE_RESET_PASSWORD_NEW_INPUT },
    { name: "retypedPassword", label: "Nhập lại mật khẩu mới", actionType: ACCOUNT_PAGE_RESET_PASSWORD_RETYPED_INPUT }
]

const ChangePassword = props => {
    const classes = useStyles()
    const [formState, formDispatch] = useReducer(formReducer, formInitialState)

    const onPasswordInput = (actionType, value) => {
        return formDispatch({ type: actionType, payload: value })
    }

    return <AccountComponentLayout header="Đổi mật khẩu">
        <form className={classes.root}>
            {inputs.map(input => (
                <PasswordInput
                    key={input.name}
                    value={formState[input.name].value}
                    error={formState[input.name].invalid}
                    onPasswordInput={onPasswordInput}
                    actionType={input.actionType}
                    label={input.label}></PasswordInput>
            ))}
            <Box mt={5}>
                <Grid container spacing={5}>
                    <Grid item sm={6}>
                        <Button className={classes.button} variant="outlined" fullWidth disableElevation>HỦY BỎ</Button>
                    </Grid>
                    <Grid item sm={6}>
                        <Button className={classes.button} color="primary" type="submit" variant="contained" fullWidth disableElevation>THÊM MỚI</Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AccountComponentLayout>
}

export default ChangePassword