
import { makeStyles } from "@material-ui/core"
import { useReducer, useState } from "react"
import useAuth from "../../firebase/useAuth"
import { formInitialState, formReducer } from "./AuthFormReducer"
import TabPanel from "./AuthTabs/TabPanel"
import SignIn from "./SignIn/SignIn"
import SignUp from "./SignUp/SignUp"

const useStyles = makeStyles({
    tab: {
        "& .MuiBox-root:first-child": {
            padding: 0
        }
    }
});

const Auth = props => {
    const { noButtons, onCheckout } = props
    const classes = useStyles();
    const { setAccountManagementDrawerIsOpen } = props
    const [tabValue, setTabValue] = useState(0);
    const [formState, formDispatch] = useReducer(formReducer, formInitialState)
    const { user, loading, error, signUpWithEmailAndPassword, signInWithEmailAndPassword, signInWithSocialMedia } = useAuth()

    const onSignInWithSocialMedia = async (event, provider) => {
        event.preventDefault()
        console.log("ASdasdasd")
        await signInWithSocialMedia(provider)
        if (!error) {
            console.log(user)
        }
    }

    const onSignInWithEmailAndPassword = async event => {
        event.preventDefault()
        const userAuthInfo = {
            email: formState.email.value,
            password: formState.password.value
        }
        await signInWithEmailAndPassword(userAuthInfo)
    }

    const onSignUpFormSubmitHandler = async event => {
        event.preventDefault()
        const newUser = {
            name: formState.name.value,
            phone: formState.phone.value,
            email: formState.email.value,
            password: formState.password.value
        }
        await signUpWithEmailAndPassword(newUser)
    }

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    return <div className={classes.root}>
        <TabPanel className={classes.tab} value={tabValue} index={0}>
            <SignIn
                onCheckout={onCheckout}
                error={error}
                loading={loading}
                noButtons={noButtons}
                setAccountManagementDrawerIsOpen={setAccountManagementDrawerIsOpen}
                formState={formState}
                formDispatch={formDispatch}
                onSignInWithEmailAndPassword={onSignInWithEmailAndPassword}
                onSignInWithSocialMedia={onSignInWithSocialMedia}
                handleTabChange={handleTabChange}
            ></SignIn>
        </TabPanel>
        <TabPanel className={classes.tab} value={tabValue} index={1}>
            <SignUp
                onCheckout={onCheckout}
                error={error}
                loading={loading}
                setAccountManagementDrawerIsOpen={setAccountManagementDrawerIsOpen}
                formState={formState}
                formDispatch={formDispatch}
                onSignUpFormSubmitHandler={onSignUpFormSubmitHandler}
                handleTabChange={handleTabChange}
            ></SignUp>
        </TabPanel>
    </div >
}

export default Auth