import { Button, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeading from '../../../components/Admin/Table/TableHeading';
import TableToolbar from '../../../components/Admin/Table/TableToolbar';
import useTable from '../../../components/Admin/Table/useTable';
import Confirmation from '../../../components/Confirmation/Confirmation';
import CustomizedSnackbar from '../../../components/CustomizedSnackbar/CustomizedSnackbar';
import FormattedPrice from '../../../components/FormattedPrice/FormattedPrice';
import PageContentLayout from '../../../components/Layout/PageContentLayout';
import OrderDetailsModal from '../../../components/OrderDetails/OrderDetailsModal';
import stableSort, { getComparator } from '../../../helpers/tableSort';
import { deleteUsers, fetchUsers } from '../../../store/admin-actions';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Tên khách hàng' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Địa chỉ' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Số điện thoại' },
    { id: 'orders', numeric: false, disablePadding: false, label: 'Đơn hàng' },
    { id: 'totalSpent', numeric: true, disablePadding: false, label: 'Đã chi' }
];

const useStyles = makeStyles((theme) => ({
    root: { width: '100%' },

    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },

    table: { minWidth: 750 },

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
    }
}));

const AdminUsers = props => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.admin.users)
    const classes = useStyles();
    let rows = []
    const { order, orderBy, selected, setSelected, page, dense, rowsPerPage,
        handleRequestSort, handleSelectAllClick, handleClick,
        handleChangePage, handleChangeRowsPerPage,
        isSelected, emptyRows } = useTable(rows)
    const [confirmationShowing, setConfirmationShowing] = useState(false)
    const [snackbarShowing, setSnackbarShowing] = useState(false)
    const [detailsShowing, setDetailsShowing] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const onUsersDelete = () => {
        setSelected(prevState => prevState.filter(p => !selected.includes(p)))
        dispatch(deleteUsers(selected))
        setSnackbarShowing(true)
    }

    const onDetailsButtonClick = (event, order) => {
        event.stopPropagation()
        setDetailsShowing(true)
        setSelectedUser(order)
    }

    if (users) {
        rows = users.map(user => {
            return {
                ...user,
                totalSpent: user.orders.length ? user.orders.reduce((accumulator, order) => accumulator + order.total, 0) : 0
            }
        })
    }

    return <PageContentLayout>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableToolbar
                    numSelected={selected.length}
                    setConfirmationShowing={setConfirmationShowing}
                    title="Tài khoản" />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table">
                        <TableHeading
                            headCells={headCells}
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={event => handleSelectAllClick(event, rows)}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    console.log(row)
                                    return (
                                        <TableRow
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
                                            {['name', 'email', 'address', 'phone'].map(field => (
                                                <TableCell align="left">{row[field]}</TableCell>
                                            ))}
                                            <TableCell align="left">
                                                {row.orders.length
                                                    ? row.orders.map(order => (
                                                        <Button onClick={event => onDetailsButtonClick(event, order.products)}>{order.id}</Button>
                                                    ))
                                                    : <Typography>Không có đơn hàng nào</Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                <FormattedPrice price={row.totalSpent} />
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
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>

        {/* DETAILS MODAL */}
        <OrderDetailsModal
            order={selectedUser}
            detailsShowing={detailsShowing}
            setDetailsShowing={setDetailsShowing} />
        {/* DELETE USERS COMPLETE SNACKBARS */}
        <CustomizedSnackbar
            showing={snackbarShowing}
            message="Xóa người dùng thành công"
            severity="success"
            setShowing={setSnackbarShowing} />
        {/* DELETE USERS CONFIRMATION */}
        <Confirmation
            title="Xác nhận xóa người dùng"
            content="Bạn chắc chắn muốn xóa những người dùng này chứ?"
            confirm="Xác nhận"
            cancel="Hủy"
            confirmActions={onUsersDelete}
            confirmationShowing={confirmationShowing}
            setConfirmationShowing={setConfirmationShowing} />
    </PageContentLayout>
}

export default AdminUsers