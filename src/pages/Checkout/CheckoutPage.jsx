import { Box, Grid, IconButton, makeStyles, Typography } from "@material-ui/core"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import { Fragment, useState } from "react"
import { Link, Route, Switch } from "react-router-dom"
import CartCheckoutDrawer from "../../components/Cart/CartCheckoutDrawer"
import Logo from '../../components/Logo/Logo'
import CheckoutAuth from "./CheckoutAuth"
import CheckoutDelivery from "./CheckoutDelivery"
import CheckoutStepper from "./CheckoutStepper"
import CheckoutSummary from "./CheckoutSummary"

const useStyles = makeStyles({
    root: {
        height: "92vh"
    }
})

const Checkout = props => {
    const { localStorageCart, setLocalStorageCart } = props
    const [activeStep, setActiveStep] = useState(0);

    const classes = useStyles()

    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBackStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return <Grid container className={classes.root}>
        <Grid item sm={9}>
            {/* NAV */}
            <Box component="nav" display="flex" alignItems="center" pt={2} pb={5}>
                <IconButton href="/">
                    <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
                </IconButton>
                <Box width="92%" justifySelf="center">
                    <Logo></Logo>
                </Box>
            </Box>
            {/* MAIN */}
            <Box width="75%" m="auto">
                {!localStorageCart.products.length && activeStep === 0
                    // If the cart is empty, do not render checkout comps
                    ? <Box textAlign="center" mt={10}>
                        <Typography variant="h5" component="p" gutterBottom>
                            Giỏ hàng của bạn không có sản phẩm, không thể tiến hành thanh toán.
                        </Typography>
                        <Link href="/">
                            Quay lại trang chủ.
                        </Link>
                    </Box>
                    // If the cart is not empty, render checkout comps
                    : <Fragment>
                        <CheckoutStepper activeStep={activeStep} />
                        <Switch>
                            <Route
                                path={`/checkout/auth`}
                                render={() => <CheckoutAuth handleNextStep={handleNextStep} />} />
                            {activeStep >= 1
                                && <Route
                                    path={`/checkout/delivery`}
                                    render={() => <CheckoutDelivery handleNextStep={handleNextStep} handleBackStep={handleBackStep} />} />
                            }
                            {activeStep >= 2
                                && <Route
                                    path={`/checkout/summary`}
                                    render={() => <CheckoutSummary
                                        handleNextStep={handleNextStep}
                                        handleBackStep={handleBackStep}
                                        localStorageCart={localStorageCart}
                                        setLocalStorageCart={setLocalStorageCart} />} />
                            }
                        </Switch>
                    </Fragment>
                }
            </Box>
        </Grid>
        <Grid item sm={3}>
            <CartCheckoutDrawer
                localStorageCart={localStorageCart}
                setLocalStorageCart={setLocalStorageCart} />
        </Grid>
    </Grid>
}

export default Checkout