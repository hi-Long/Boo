import { Box, IconButton, makeStyles, Typography } from "@material-ui/core"
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import { useDispatch } from "react-redux"
import { uiActions } from "../../store/ui-slice"

const useStyles = makeStyles({
    root: {
        boxShadow: "0 2px 5px lightgray",
        zIndex: 2
    }
})

const CartDrawerHeader = props => {
    const { noButtons, noItems } = props
    const dispatch = useDispatch()
    const classes = useStyles()

    return <Box
        className={classes.root}
        display="flex" justifyContent="space-between" alignItems="center" px={2} py={2}>
        <Typography variant="h5" component="h2">
            <Box fontWeight="fontWeightMedium"> GIỎ HÀNG ({noItems}) </Box>
        </Typography>
        {noButtons && <IconButton
            aria-label="delete" color="primary"
            onClick={() => dispatch(uiActions.setCartDrawerShowing(false))}>
            <CloseOutlinedIcon fontSize="medium" />
        </IconButton>}
    </Box>
}

export default CartDrawerHeader