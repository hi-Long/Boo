import { Fragment } from "react";
import SignInFooter from "./SignInFooter";
import SignInForm from "./SignInForm";
import SignInHeader from "./SignInHeader";

const SignIn = props => {
    const {
        noButtons, error, loading, onCheckout,
        handleTabChange,
        setAccountManagementDrawerIsOpen,
        onSignInWithEmailAndPassword,
        onSignInWithSocialMedia,
        formDispatch, formState } = props

    return <Fragment>
        {/* HEADER */}
        <SignInHeader
            onCheckout={onCheckout}
            noButtons={noButtons}
            setAccountManagementDrawerIsOpen={setAccountManagementDrawerIsOpen}
        ></SignInHeader>
        {/* SIGN IN INPUT GROUP */}
        <SignInForm
            error={error}
            loading={loading}
            formState={formState}
            formDispatch={formDispatch}
            onSignInWithEmailAndPassword={onSignInWithEmailAndPassword} />

        {/* OTHER AUTH METHODS */}
        <SignInFooter
            handleTabChange={handleTabChange}
            onSignInWithSocialMedia={onSignInWithSocialMedia}
        ></SignInFooter>
    </Fragment>
}

export default SignIn