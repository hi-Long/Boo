import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, FormControl, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountComponentLayout from '../../../components/Account/AccountComponentLayout';
import { ACCOUNT_PAGE_PERSONAL_INFO_ADDRESS_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_DOB_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_EMAIL_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_GENDER_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_NAME_INPUT, ACCOUNT_PAGE_PERSONAL_INFO_PHONE_INPUT } from '../../constants';
import { updateUser } from '../../store/auth-actions';
import { formInitialState, formReducer } from './personalInfoReducer';

const useStyles = makeStyles({
    input: {
        display: "flex",
        alignItems: "flex-end",
        width: "80%"
    },
    gender: { flexDirection: "row" },
    email: { marginTop: "1rem" }
})

const PersonalInfo = props => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const [formState, formDispatch] = useReducer(formReducer, formInitialState, () => {
        if (user) {
            return {
                name: { value: user.name, valid: true },
                phone: { value: user.phone, valid: true },
                email: { value: user.email, valid: true },
                dob: { value: user.dob, valid: true },
                gender: user.gender,
                address: { value: user.address, valid: true }
            }
        }
        return formInitialState
    })

    useEffect(() => {
        if (user) {
            formDispatch({
                type: "SET_ALL",
                payload: {
                    name: { value: user.name, valid: true },
                    phone: { value: user.phone, valid: true },
                    email: { value: user.email, valid: true },
                    dob: { value: user.dob, valid: true },
                    gender: user.gender,
                    address: { value: user.address, valid: true }
                }
            })
        }
    }, [user])

    const classes = useStyles()

    const onFieldInput = (event, actionType) => {
        return formDispatch({ type: actionType, payload: event.target.value })
    }

    const handleDobChange = (date) => {
        formDispatch({ type: ACCOUNT_PAGE_PERSONAL_INFO_DOB_INPUT, payload: date })
    };

    const onUserUpdate = event => {
        event.preventDefault()
        const updatedUser = {
            ...user,
            name: formState.name.value,
            phone: formState.phone.value,
            email: formState.email.value,
            dob: formState.dob,
            gender: formState.gender,
            address: formState.address.value
        }
        dispatch(updateUser(updatedUser))
    }

    return <AccountComponentLayout header="Thông tin cá nhân">
        <form onSubmit={event => onUserUpdate(event)}>
            <Grid container spacing={3}>
                <Grid item sm={6}>
                    <TextField
                        required id="name" label="Họ tên"
                        defaultValue={formState.name.value} fullWidth
                        onChange={event => onFieldInput(event, ACCOUNT_PAGE_PERSONAL_INFO_NAME_INPUT)} />
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        required id="phone" label="Số điện thoại"
                        defaultValue={formState.phone.value} fullWidth
                        onChange={event => onFieldInput(event, ACCOUNT_PAGE_PERSONAL_INFO_PHONE_INPUT)} />
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        className={classes.email}
                        required id="email" label="Email"
                        defaultValue={formState.email.value} fullWidth
                        onChange={event => onFieldInput(event, ACCOUNT_PAGE_PERSONAL_INFO_EMAIL_INPUT)} />
                </Grid>
                <Grid item sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            fullWidth
                            id="dob"
                            label="Ngày sinh"
                            value={formState.dob}
                            onChange={handleDobChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                    </MuiPickersUtilsProvider>
                </Grid>
                {/* GENDER */}
                <Grid item sm={12}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            className={classes.gender} aria-label="gender"
                            name="gender" value={formState.gender}
                            onChange={event => onFieldInput(event, ACCOUNT_PAGE_PERSONAL_INFO_GENDER_INPUT)}>
                            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {/* ADDRESS */}
                <Grid item sm={12}>
                    <TextField
                        required id="email" label="Địa chỉ"
                        defaultValue={formState.address.value} fullWidth
                        onChange={event => onFieldInput(event, ACCOUNT_PAGE_PERSONAL_INFO_ADDRESS_INPUT)} />
                </Grid>
            </Grid>
            {/* SUBMIT BUTTON */}
            <Box width="50%" m="auto" mt={8}>
                <Button
                    type="submit"
                    variant="contained" color="secondary"
                    fullWidth size="large" disableElevation>CẬP NHẬT</Button>
            </Box>
        </form>
    </AccountComponentLayout>
}

export default PersonalInfo