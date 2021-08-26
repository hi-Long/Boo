import { Box, makeStyles } from "@material-ui/core"
import CategoriesDrawer from "./CategoriesDrawer"
import CategoryDrawerToggler from "./CategoryDrawerToggler"

const useStyles = makeStyles({
    root: {

    },
    root__categories: {
        "& .MuiDrawer-paper": {
            width: "50%"
        }
    }
})

const Categories = () => {
    const classes = useStyles()

    return <Box
        className={classes.root}
        display="flex"
        justifyContent="flex-start">
        {/* CATEGORIES TOGGLER */}
        <CategoryDrawerToggler />
        {/* CATEGORIES DIV */}
        <CategoriesDrawer />
    </Box >
}

export default Categories