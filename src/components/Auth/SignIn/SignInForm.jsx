import { Button, CircularProgress, makeStyles, TextField, Typography } from "@material-ui/core";
import PasswordInput from "../../UI/InputPassword";
import { FORM_EMAIL_INPUT, FORM_PASSWORD_INPUT } from "../authConstants";

const useStyles = makeStyles({
    "form--sign-in": {
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
    },
    button: {
        padding: ".8rem .5rem",
        marginBottom: "2rem",
        borderRadius: 0
    },
    error: {
        color: "red"
    }
})

const SignInForm = props => {
    const { error, loading, onSignInWithEmailAndPassword, formState, formDispatch } = props
    const classes = useStyles()

    const onPasswordInput = value => {
        formDispatch({ type: FORM_PASSWORD_INPUT, payload: value })
    }

    return <form
        className={classes["form--sign-in"]} id="#sign-in"
        onSubmit={event => onSignInWithEmailAndPassword(event)}
    >
        <TextField
            className={classes.input}
            id="sign-in__email"
            label="Email"
            required
            value={formState.email.value}
            onChange={event => formDispatch({ type: FORM_EMAIL_INPUT, payload: event.target.value })}
            error={formState.email.error}
            inputProps={{ type: "email" }}
        />

        <PasswordInput
            value={formState.password.value}
            error={formState.password.error}
            onPasswordInput={onPasswordInput}
            label="Password" />

        {error && <Typography className={classes.error}>Email hoặc mật khẩu không chính xác!</Typography>}

        <Typography variant="body1" color="textSecondary">Quên mật khẩu ?</Typography>
        <Button
            type="submit" variant="contained"
            className={classes.button}
            color="primary" size="large" disableElevation>
            {loading
                ? <CircularProgress className={classes.loading} color="secondary" />
                : "ĐĂNG NHẬP"
            }
        </Button>
    </form>
}

export default SignInForm