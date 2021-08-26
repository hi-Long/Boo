import { Box, CssBaseline, makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import AdminNav from "./components/AdminNav"
import AdminOrders from "./components/AdminOrders"
import AdminProducts from "./components/AdminProducts"
import AdminUsers from "./components/AdminUsers"

const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        width: "100%",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const AdminPage = props => {
    const user = useSelector(state => state.auth.user)
    const userFetching = useSelector(state => state.ui.userFetching)
    const [open, setOpen] = useState(false);
    const classes = useStyles()

    if (!userFetching && user && user.role !== "admin") {
        return <Redirect to="/" />
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return <div className={classes.root}>
        <CssBaseline />
        <AdminNav
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose} />
        <Box className={clsx(classes.content, {
            [classes.contentShift]: open,
        })}>
            <Route path={`/admin/products`} render={() => <AdminProducts />}></Route>
            <Route path={`/admin/orders`} render={() => <AdminOrders />}></Route>
            <Route path={`/admin/users`} render={() => <AdminUsers />}></Route>
        </Box>
    </div>


}

export default AdminPage