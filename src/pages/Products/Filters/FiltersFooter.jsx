import { Box, Button, makeStyles } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { searchActions } from "../../../store/search-slice"

const useStyles = makeStyles({
    root: {
        boxShadow: "0 -3px 5px gainsboro"
    },
    button: {
        width: "50%",
        paddingBlock: "1rem",
        border: "0",
        borderRadius: 0,

        "&:last-child": {
            backgroundColor: "black",
            color: "white"
        }
    }
})

const FiltersFooter = props => {
    const dispatch = useDispatch()
    const noProducts = useSelector(state => state.search.noProducts)
    const classes = useStyles()

    return <Box className={classes.root}>
        <Button
            className={classes.button} variant="outlined"
            size="large" disableElevation
            onClick={() => dispatch(searchActions.resetParams())}
        >HOÀN TÁC BỘ LỌC</Button>
        <Button
            className={classes.button} variant="contained"
            size="large" disableElevation>XEM {noProducts} SẢN PHẨM</Button>
    </Box>
}

export default FiltersFooter