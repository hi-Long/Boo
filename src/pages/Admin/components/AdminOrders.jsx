import { Button, Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrdersFilters from '../../../components/Admin/Orders/OrdersFilters';
import TableHeading from '../../../components/Admin/Table/TableHeading';
import TableToolbar from '../../../components/Admin/Table/TableToolbar';
import useTable from '../../../components/Admin/Table/useTable';
import Confirmation from '../../../components/Confirmation/Confirmation';
import CustomizedSnackbar from '../../../components/CustomizedSnackbar/CustomizedSnackbar';
import FormattedPrice from '../../../components/FormattedPrice/FormattedPrice';
import PageContentLayout from '../../../components/Layout/PageContentLayout';
import OrderDetailsModal from '../../../components/OrderDetails/OrderDetailsModal';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';
import stableSort, { getComparator } from '../../../helpers/tableSort';
import { deleteOrders, fetchOrders, updateOrder } from '../../../store/admin-actions';
import OrderStatus from './OrderStatus';

const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'id' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Tên khách hàng' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Số điện thoại' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Địa chỉ' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Trạng thái' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Tổng' },
    { id: 'paymentMethod', numeric: true, disablePadding: false, label: 'Thanh toán' },
    { id: 'orders', numeric: false, disablePadding: false, label: 'Chi tiết' }
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    row: {
        "& .Mui-selected": {
            background: "royalblue"
        }
    }
}));

export default function AdminUsers() {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.admin.orders)
    let [rows, setRows] = useState(() => {
        if (orders.length) {
            return orders.map(order => {
                return {
                    ...order,
                    paymentStatus: "Hoàn thành",
                }
            })
        }
        return []
    })
    const { order, orderBy, selected, setSelected, page, dense, rowsPerPage,
        handleRequestSort, handleSelectAllClick, handleClick,
        handleChangePage, handleChangeRowsPerPage, handleChangeDense,
        isSelected, emptyRows } = useTable(rows)
    const [confirmationShowing, setConfirmationShowing] = useState(false)
    const [snackbarShowing, setSnackbarShowing] = useState(false)
    const [detailsShowing, setDetailsShowing] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})

    const [filtersIsOpened, setFiltersIsOpened] = useState(false)
    const [selectedStatus, setStatus] = useState([])
    const [selectedPayments, setPayments] = useState([])
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const onNewOrderStatus = (event, order, newStatus) => {
        event.stopPropagation()
        const updatedOrder = {
            ...order,
            status: newStatus
        }
        dispatch(updateOrder(updatedOrder))
    }

    const onOrdersFilter = useCallback(() => {
        const filtered = orders.filter(o => {
            if (selectedStatus.length) {
                if (!selectedStatus.includes(capitalizeFirstLetter(o.status.toLowerCase()))) {
                    return false
                }
            }
            if (selectedPayments.length) {
                if (!selectedPayments.includes(capitalizeFirstLetter(o.paymentMethod.toLowerCase()))) {
                    return false
                }
            }
            return true
        })
        setRows(filtered)
    }, [selectedStatus, selectedPayments, orders])

    useEffect(() => {
        if (orders) {
            onOrdersFilter()
        }
    }, [onOrdersFilter, orders])

    const onOrdersDelete = () => {
        setSelected(prevState => prevState.filter(p => !selected.includes(p)))
        dispatch(deleteOrders(selected))
        setSnackbarShowing(true)
    }

    const onDetailsButtonClick = order => {
        setDetailsShowing(true)
        setSelectedOrder(order)
    }

    return <PageContentLayout>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* TOOLBAR */}
                <TableToolbar
                    numSelected={selected.length}
                    setConfirmationShowing={setConfirmationShowing}
                    setFiltersIsOpened={setFiltersIsOpened}
                    title="Đơn hàng" />
                {filtersIsOpened && <Divider />}
                <OrdersFilters
                    selectedStatus={selectedStatus}
                    selectedPayments={selectedPayments}
                    setPayments={setPayments}
                    setStatus={setStatus}
                    filtersIsOpened={filtersIsOpened} />
                {filtersIsOpened && <Divider />}
                {/* MAIN */}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table">
                        {/* HEADING */}
                        <TableHeading
                            headCells={headCells}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={(event) => handleSelectAllClick(event, rows)}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length} />
                        {/* BODY */}
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            className={classes.row}
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.id}
                                            </TableCell>
                                            {["name", "phone", "address"].map(field => (
                                                <TableCell align="center">{row.delivery[field]}</TableCell>
                                            ))}
                                            <TableCell align="center">
                                                <OrderStatus row={row} onNewOrderStatus={onNewOrderStatus} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <FormattedPrice price={row.total} />
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.paymentMethod}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained" color="primary"
                                                    onClick={() => onDetailsButtonClick(row.products)}>Xem</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* PAGINATION */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
        {/* DETAILS MODAL */}
        <OrderDetailsModal
            order={selectedOrder}
            detailsShowing={detailsShowing}
            setDetailsShowing={setDetailsShowing} />
        {/* DELETE COMPLETE */}
        <CustomizedSnackbar
            showing={snackbarShowing}
            message="Xóa đơn hàng thành công"
            severity="success"
            setShowing={setSnackbarShowing} />
        {/* DELETE USERS CONFIRMATION */}
        <Confirmation
            title="Xác nhận xóa người dùng"
            content="Bạn chắc chắn muốn xóa đơn hàng chứ?"
            confirm="Xác nhận"
            cancel="Hủy"
            confirmActions={onOrdersDelete}
            confirmationShowing={confirmationShowing}
            setConfirmationShowing={setConfirmationShowing} />
    </PageContentLayout>
}
