import { Box, makeStyles } from "@material-ui/core"
import NavigationBar from "../NavigationBar/NavigationBar"

const useStyles = makeStyles({
    // root: {
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     right: 0
    // }
})

const PageLayout = props => {
    const { localStorageCart, setLocalStorageCart, width } = props
    const classes = useStyles()

    return <Box className={classes.root}>
        <NavigationBar
            width={width}
            localStorageCart={localStorageCart}
            setLocalStorageCart={setLocalStorageCart}
            {...props.extra}></NavigationBar>
        {props.children}
    </Box>
}

export default PageLayout