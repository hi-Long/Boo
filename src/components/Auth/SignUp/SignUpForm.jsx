import { Button, CircularProgress, makeStyles, TextField, Typography } from "@material-ui/core"
import PasswordInput from "../../UI/InputPassword"
import { FORM_EMAIL_INPUT, FORM_NAME_INPUT, FORM_PASSWORD_INPUT, FORM_PHONE_INPUT } from "../authConstants"

const useStyles = makeStyles({
    "form--sign-up": {
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

const formInputs = [
    {
        field: 'name',
        label: 'Họ & Tên',
        actionType: FORM_NAME_INPUT,
        props: { minLength: 2 }
    },
    {
        field: 'phone',
        label: 'Số điện thoại',
        actionType: FORM_PHONE_INPUT,
        props: { pattern: "[0-9]{11}" },
    },
    {
        field: 'email',
        label: 'Email',
        actionType: FORM_EMAIL_INPUT,
        props: { type: "email" }
    }
]

const SignUpForm = props => {
    const classes = useStyles()
    const {
        error, loading,
        onSignUpFormSubmitHandler,
        formState, formDispatch } = props

    const onPasswordInput = value => {
        formDispatch({ type: FORM_PASSWORD_INPUT, payload: value })
    }

    return <form
        className={classes["form--sign-up"]}
        id="sign-up"
        onSubmit={event => onSignUpFormSubmitHandler(event)}
    >
        {formInputs.map(input => (
            <TextField key={input.field}
                required
                inputProps={input.props}
                className={classes.input}
                id={`sign-up__${input.field}`}
                label={`${input.label}`}
                value={formState[input.field].value}
                onChange={event => formDispatch({ type: input.actionType, payload: event.target.value })}
                error={formState[input.field].error}
            />
        ))}

        <PasswordInput
            value={formState.password.value}
            error={formState.password.error}
            onPasswordInput={onPasswordInput}
            label="Password"></PasswordInput>

        {error && <Typography className={classes.error}>{error}</Typography>}

        <Button
            type="submit" variant="contained"
            className={classes.button}
            color="primary" size="large" disableElevation>
            {loading ? <CircularProgress /> : "TẠO TÀI KHOẢN"}</Button>
    </form >
}

export default SignUpForm