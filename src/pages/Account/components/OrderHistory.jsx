import { Box, Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import AccountComponentLayout from "../../../components/Account/AccountComponentLayout";
import { fetchOrders } from "../../store/account-actions";
import { accountActions } from "../../store/account-slice";
import CustomizedSnackbar from "../CustomizedSnackbar/CustomizedSnackbar";
import FormattedPrice from "../FormattedPrice/FormattedPrice";
import OrderDetails from "../OrderDetails/OrderDetails";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(code, date, receiver, address, total) {
    return { code, date, receiver, address, total };
}

const OrderHistory = props => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const orders = useSelector(state => state.account.orders)
    const { url } = useRouteMatch()
    const history = useHistory()
    const classes = useStyles();
    const [cancelOrderSuccessShowing, setCancelOrderSuccessShowing] = useState(false)

    useEffect(() => {
        if (user) {
            dispatch(fetchOrders(user.id))
        }
    }, [dispatch, user])

    const onDetailsButtonClick = orderId => {
        dispatch(accountActions.setSelectedOrder(orders.find(order => order.id === orderId)))
        history.push('/account/orders/' + orderId)
    }

    if (!orders.length) {
        return <AccountComponentLayout header="Lịch sử đơn hàng">
            <Box textAlign="center" mt={10}>
                <Typography variant="h6" component="p">Bạn chưa có đơn hàng nào!</Typography>
            </Box>
        </AccountComponentLayout>
    }

    return <AccountComponentLayout header="Lịch sử đơn hàng">
        {/* ORDERS TABLE */}
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                {/* TABLE HEADER */}
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: "9rem" }}>TRẠNG THÁI</TableCell>
                        <TableCell align="center">NGÀY TẠO</TableCell>
                        <TableCell align="center"> NGƯỜI NHẬN </TableCell>
                        <TableCell align="center" style={{ width: "13rem" }}>ĐỊA CHỈ</TableCell>
                        <TableCell align="center">SỐ TIỀN</TableCell>
                        <TableCell align="right">CHI TIẾT</TableCell>
                    </TableRow>
                </TableHead>
                {/* TABLE BODY */}
                <TableBody>
                    {orders && orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell size="medium" align="left">
                                <span style={{ color: "green" }}>{order.status}</span>
                            </TableCell>
                            <TableCell align="left">{order.date}</TableCell>
                            <TableCell align="left">{order.delivery.name}</TableCell>
                            <TableCell align="left">{order.delivery.address}</TableCell>
                            <TableCell align="left">
                                <FormattedPrice price={order.total} />

                            </TableCell>
                            <TableCell align="left">
                                <Button
                                    variant="outlined"
                                    onClick={() => onDetailsButtonClick(order.id)}>Xem</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* ORDER DETAILS */}
        <Route path="/account/orders/:id" render={() => <OrderDetails onAccount={true} setCancelOrderSuccessShowing={setCancelOrderSuccessShowing} />} />
        <CustomizedSnackbar
            message="Hủy đơn hàng thành công"
            severity="success"
            showing={cancelOrderSuccessShowing}
            setShowing={setCancelOrderSuccessShowing} />
    </AccountComponentLayout>
}

export default OrderHistory