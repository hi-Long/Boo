import { List, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core"
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ListItemLink from "../../../ListItemLink/ListItemLink";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useSelector } from "react-redux";


const useStyles = makeStyles({
    listItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "between",
        paddingInline: "0",
        "&:hover": {
            backgroundColor: "white",
            color: "green",

            "& .MuiListItemIcon-root": {
                color: "green"
            }
        }
    },
    icon: {
        justifyContent: "center"
    }
})

const AccountManagementBody = props => {
    const classes = useStyles()
    const user = useSelector(state => state.auth.user)

    const fields = [
        { name: 'Thông tin cá nhân', to: '/account/personal-info', icon: <AccountCircleOutlinedIcon /> },
        { name: 'Lịch sử đơn hàng', to: '/account/orders', icon: <ShopOutlinedIcon /> },
        { name: 'Địa chỉ giao hàng', to: '/account/delivery', icon: <RoomOutlinedIcon /> },
        { name: 'Thay đổi mật khẩu', to: '/account/password', icon: <FingerprintIcon /> },
        (user && user.role === "admin") && { name: 'Quản trị viên', to: '/admin/products', icon: <SupervisorAccountIcon /> }
    ]

    return <List>
        {fields.map(f => f && (
            <ListItemLink className={classes.listItem} href={f.to} key={f.name}>
                <ListItemText>{f.name}</ListItemText>
                <ListItemIcon className={classes.icon}>{f.icon}</ListItemIcon>
            </ListItemLink>
        ))}
    </List>
}

export default AccountManagementBody