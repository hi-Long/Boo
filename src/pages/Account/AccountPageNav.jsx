import { Box, Button, Divider, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from "@material-ui/core";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import { useHistory } from "react-router-dom";
import { ACCOUNT_PAGE_NESTED_DELIVERY, ACCOUNT_PAGE_NESTED_ORDERS, ACCOUNT_PAGE_NESTED_PASSWORD, ACCOUNT_PAGE_NESTED_PERSONAL_INFO } from "../../constants";

const navItems = [
    { name: 'Thông tin cá nhân', link: ACCOUNT_PAGE_NESTED_PERSONAL_INFO, icon: <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon> },
    { name: 'Lịch sử đơn hàng', link: ACCOUNT_PAGE_NESTED_ORDERS, icon: <ShopOutlinedIcon></ShopOutlinedIcon> },
    { name: 'Địa chỉ giao hàng', link: ACCOUNT_PAGE_NESTED_DELIVERY, icon: <RoomOutlinedIcon></RoomOutlinedIcon> },
    { name: 'Thay đổi mật khẩu', link: ACCOUNT_PAGE_NESTED_PASSWORD, icon: <FingerprintIcon></FingerprintIcon> }
]

const useStyles = makeStyles(theme => ({
    root: {
        height: "92vh",
        width: "23%",
        position: "fixed",
        top: 0,
        right: 0,
        background: "whitesmoke"
    },
    listItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "between",
        paddingInline: "0",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "whitesmoke",
            color: "green",

            "& .MuiListItemIcon-root": {
                color: "green"
            }
        }
    },
    icon: { justifyContent: "center" }
}))

const AccountPageNav = props => {
    const history = useHistory()
    const classes = useStyles()

    const onNavItemClick = link => {
        history.push('/account/' + link)
    }

    return <Box className={classes.root} height="100%" display="flex" flexDirection="column" pt={5} p={2}>
        {/* HEADER */}
        <Box>
            <Typography variant="h5" component="h2" gutterBottom>Xin chào, Hải Long Nguyễn</Typography>
            <Divider />
        </Box>
        {/* TOP */}
        <Box mt={3} flexGrow={1}>
            {navItems.map(item => (
                <Box>
                    <ListItem
                        className={classes.listItem} key={item.name}
                        onClick={() => onNavItemClick(item.link)}>
                        <ListItemText>{item.name}</ListItemText>
                        <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
                    </ListItem>
                </Box>
            ))}
        </Box>
        {/* BOTTOM */}
        <Box>
            <Box mb={2}>
                <Button
                    className={classes.button} color="primary"
                    variant="contained" size="large"
                    fullWidth disableElevation
                    href="/">VỀ TRANG CHỦ</Button>
            </Box>
            <Button
                className={classes.button} color="primary"
                variant="contained" size="large" fullWidth disableElevation>ĐĂNG XUẤT</Button>
        </Box>
    </Box>
}

export default AccountPageNav
