import { Fragment } from "react"
import SignUpFooter from "./SignUpFooter"
import SignUpForm from "./SignUpForm"
import SignUpHeader from "./SignUpHeader"

const SignUp = props => {
    const {
        error,
        loading, onCheckout,
        setAccountManagementDrawerIsOpen,
        handleTabChange,
        onSignUpFormSubmitHandler,
        formDispatch, formState } = props

    return <Fragment>
        <SignUpHeader
            onCheckout={onCheckout}
            handleTabChange={handleTabChange}
            setAccountManagementDrawerIsOpen={setAccountManagementDrawerIsOpen}
        ></SignUpHeader>
        <SignUpForm
            error={error}
            loading={loading}
            formState={formState}
            formDispatch={formDispatch}
            onSignUpFormSubmitHandler={onSignUpFormSubmitHandler}
        ></SignUpForm>
        <SignUpFooter handleTabChange={handleTabChange}></SignUpFooter>
    </Fragment>
}

export default SignUp