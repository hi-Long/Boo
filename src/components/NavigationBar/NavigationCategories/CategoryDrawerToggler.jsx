import { IconButton, makeStyles } from "@material-ui/core"
import DehazeIcon from '@material-ui/icons/Dehaze'
import { useDispatch } from "react-redux"
import { uiActions } from "../../../store/ui-slice"

const useStyles = makeStyles({
    root: {

    }
})

const CategoryDrawerToggler = props => {
    const dispatch = useDispatch()
    const classes = useStyles()

    return <IconButton
        className={classes.root}
        onMouseOver={() => dispatch(uiActions.setCategoryDrawerShowing(true))}
        aria-label="navbar-toggler">
        <DehazeIcon></DehazeIcon>
    </IconButton>
}

export default CategoryDrawerToggler