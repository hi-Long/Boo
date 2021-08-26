import { Box, Button, CircularProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FormattedDate } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { fetchOrders } from "../../store/account-actions";
import { accountActions } from "../../store/account-slice";
import CustomizedSnackbar from "../CustomizedSnackbar/CustomizedSnackbar";
import FormattedPrice from "../FormattedPrice/FormattedPrice";
import OrderDetails from "../OrderDetails/OrderDetails";
import AccountComponentLayout from "./AccountComponentLayout";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const OrderHistory = props => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const orders = useSelector(state => state.account.orders)
    const ordersFetching = useSelector(state => state.ui.ordersFetching)
    const userFetching = useSelector(state => state.ui.userFetching)
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

    if (ordersFetching || userFetching) {
        return <AccountComponentLayout header="Lịch sử đơn hàng">
            <Box width="100%" display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        </AccountComponentLayout>
    }

    return <AccountComponentLayout header="Lịch sử đơn hàng">
        {!orders.length
            ? <Box textAlign="center" mt={10}>
                <Typography variant="h6" component="p">Bạn chưa có đơn hàng nào!</Typography>
            </Box>
            : <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    {/* TABLE HEADER */}
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "6rem" }}>TRẠNG THÁI</TableCell>
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
                                <TableCell align="left">
                                    <FormattedDate value={order.date} />
                                </TableCell>
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
        }

        {/* ORDER DETAILS */}
        <Route path="/account/orders/:id" render={() => <OrderDetails onAccount={true} setCancelOrderSuccessShowing={setCancelOrderSuccessShowing} />} />
        {/* ORDER CANCEL SNACKBAR    */}
        <CustomizedSnackbar
            message="Hủy đơn hàng thành công"
            severity="success"
            showing={cancelOrderSuccessShowing}
            setShowing={setCancelOrderSuccessShowing} />
    </AccountComponentLayout >
}

export default OrderHistory