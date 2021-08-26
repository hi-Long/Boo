import { Box, makeStyles } from "@material-ui/core"
import FiltersBody from "./Filters/FiltersBody"
import FiltersFooter from "./Filters/FiltersFooter"
import FiltersHeader from "./Filters/FiltersHeader"

const useStyles = makeStyles({
    root: {
        position: "fixed",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        boxShadow: "-5px 0 4px lightgray",
        zIndex: 1
    }
})

const Filters = props => {
    const { show, onToggleFilters } = props
    const classes = useStyles(show)

    return <Box className={classes.root} width="25%">
        <FiltersHeader onToggleFilters={onToggleFilters}></FiltersHeader>
        <FiltersBody></FiltersBody>
        <FiltersFooter onToggleFilters={onToggleFilters}></FiltersFooter>
    </Box>
}

export default Filters