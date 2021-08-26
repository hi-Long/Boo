import { Box, Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeading from '../../../components/Admin/Table/TableHeading';
import TableToolbar from '../../../components/Admin/Table/TableToolbar';
import useTable from '../../../components/Admin/Table/useTable';
import FormattedPrice from '../../../components/FormattedPrice/FormattedPrice';
import stableSort, { getComparator } from '../../../helpers/tableSort';
import { fetchProducts } from '../../../store/admin-actions';
import Fetching from '../../Fetching/Fetching';
import ProductsFilters from './ProductsFilters';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Tên sản phẩm' },
    { id: 'image', numeric: false, disablePadding: false, label: 'Ảnh' },
    { id: 'categories', numeric: false, disablePadding: false, label: 'Loại' },
    { id: 'color', numeric: false, disablePadding: false, label: 'Màu sắc' },
    { id: 'materials', numeric: false, disablePadding: false, label: 'Chất liệu' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Giá tiền' },
    { id: 'click', numeric: true, disablePadding: false, label: 'Lượt xem' },
    { id: 'sold', numeric: true, disablePadding: false, label: 'Đã bán' }
];

const useStyles = makeStyles((theme) => ({
    root: { width: '100%', padding: 0 },

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

const ProductsTable = props => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.admin.products)
    const classes = useStyles();
    const [rows, setRows] = useState(() => products ? products : [])
    const { order, orderBy, selected, page, dense, rowsPerPage,
        handleRequestSort, handleSelectAllClick, handleClick,
        handleChangePage, handleChangeRowsPerPage,
        isSelected, emptyRows } = useTable(rows)
    const [filtersIsOpened, setFiltersIsOpened] = useState(false)
    const [selectedSubcates, setSubcates] = useState([])
    const [selectedColors, setColors] = useState([])
    const [selectedMaterials, setMaterials] = useState([])
    const productsFetching = useSelector(state => state.ui.productsFetching)
    const conceptsFetching = useSelector(state => state.ui.conceptsFetching)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const onProductsFilter = useCallback(() => {
        const filtered = products.filter(p => {
            if (selectedSubcates.length) {
                if (!selectedSubcates.includes(p.subcategories)) {
                    return false
                }
            }
            if (selectedColors.length) {
                if (!selectedColors.includes(p.color)) {
                    return false
                }
            }
            if (selectedMaterials.length) {
                if (!selectedMaterials.includes(p.material)) {
                    return false
                }
            }
            return true
        })
        setRows(filtered)
    }, [selectedColors, selectedMaterials, selectedSubcates, products])

    useEffect(() => {
        if (products) {
            onProductsFilter()
        }
    }, [onProductsFilter, products])

    if (productsFetching || conceptsFetching) {
        return <Fetching />
    }

    return <Box className={classes.root} mt={10}>
        <Paper className={classes.paper}>
            <TableToolbar
                numSelected={selected.length} title="Sản phẩm"
                setFiltersIsOpened={setFiltersIsOpened}
            />
            {filtersIsOpened && <Divider />}
            <ProductsFilters selectedSubcates={selectedSubcates}
                selectedColors={selectedColors}
                selectedMaterials={selectedMaterials}
                setSubcates={setSubcates}
                setColors={setColors}
                setMaterials={setMaterials}
                filtersIsOpened={filtersIsOpened} />
            {filtersIsOpened && <Divider />}
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
                                        {['name', 'images', 'subcategories', 'color', 'material', 'price', 'click', 'sold'].map(field => {
                                            let children = row[field]
                                            if (field === "price") {
                                                children = <FormattedPrice price={children} />
                                            } else if (field === "images") {
                                                children = <img src={children[0].url} height="150" alt="Product" />
                                            }
                                            return (
                                                <TableCell key={field} align="left">{children}</TableCell>
                                            )
                                        })}
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
    </Box>
}

export default ProductsTable