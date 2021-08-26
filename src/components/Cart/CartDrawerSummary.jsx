import { Box, Button, Divider, makeStyles, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import FormattedPrice from "../FormattedPrice/FormattedPrice"

const useStyles = makeStyles({
    root: {
        boxShadow: "0px -1px 5px lightgray",
        zIndex: 2,
        backgroundColor: "#fcfcfc"
    }
})

const CartDrawerSummary = props => {
    const { noButtons, total } = props
    const history = useHistory()
    const classes = useStyles()

    return <Box className={classes.root}>
        <Divider />
        <Box px={2} mb={3} pt={3} >
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h5" component="span">
                    <Box fontWeight="fontWeightRegular"> Tổng cộng </Box>
                </Typography>
                <Typography variant="subtitle1" component="span">
                    <Box fontWeight="fontWeightRegular" fontSize={24}>
                        <FormattedPrice price={total} />
                    </Box>
                </Typography>
            </Box>
            {!noButtons
                && <Button variant="outlined"
                    color="primary" fullWidth
                    size="large"
                    onClick={() => history.push('/checkout/auth')}>TIẾN HÀNH ĐẶT HÀNG</Button>}
        </Box>
    </Box>
}

export default CartDrawerSummary