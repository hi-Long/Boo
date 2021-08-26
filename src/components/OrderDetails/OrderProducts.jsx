
import { Box, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import FormattedPrice from "../FormattedPrice/FormattedPrice";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    product: {
        display: "flex",
        gap: "1rem"
    }
});

const OrderProducts = props => {
    const { localStorageCart, accountPageOrder, adminPageOrder } = props
    const classes = useStyles()

    const [products, setProducts] = useState(() => {
        if (adminPageOrder) {
            return adminPageOrder
        } else if (accountPageOrder.products) {
            console.log("YaYY")
            return accountPageOrder.products
        } else if (localStorageCart.products) {
            return localStorageCart.products
        }
        return []
    })

    const [total, setTotal] = useState(() => {
        if (accountPageOrder && accountPageOrder.total) {
            return accountPageOrder.total
        } else if (localStorageCart && localStorageCart.total) {
            return localStorageCart.total
        }
        return 0
    })

    useEffect(() => {
        if (accountPageOrder && accountPageOrder.products) {
            setProducts(accountPageOrder.products)
            setTotal(accountPageOrder.total)
        }
    }, [accountPageOrder])

    return <Box mt={4}>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ width: adminPageOrder ? "12rem" : "9rem" }}>Sản phẩm</TableCell>
                        <TableCell align="center">Giá</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center" style={{ width: "13rem" }}>Tổng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products
                        ? products.map(product => (
                            <TableRow key={`${product.item.id}${product.item.size}`}>
                                {/* code, date, receiver, address, total */}
                                <TableCell className={classes.product} size="medium" align="left">
                                    <img
                                        src={product.item.images[0].url}
                                        alt="Product"
                                        width="50%" />
                                    <Box>
                                        <Typography variant="subtitle2" component="h6" gutterBottom>
                                            <Box fontSize={12}>{product.item.name}</Box>
                                        </Typography>
                                        <Typography variant="body2" component="h6">{product.item.size}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <FormattedPrice price={product.item.price} />
                                </TableCell>
                                <TableCell align="center">{product.quantity}</TableCell>
                                <TableCell align="center">
                                    <FormattedPrice price={product.item.price * product.quantity} />
                                </TableCell>
                            </TableRow>
                        ))
                        : <Box>Không có sản phẩm nào</Box>
                    }
                    <TableRow>
                        {/* code, date, receiver, address, total */}
                        <TableCell />
                        <TableCell />
                        {!adminPageOrder &&
                            <Fragment>
                                <TableCell align="center">
                                    <Typography variant="subtitle2" component="h6" gutterBottom>Tổng cộng</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <FormattedPrice price={(localStorageCart || accountPageOrder) ? total : 0} />
                                </TableCell>
                            </Fragment>
                        }
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
}

export default OrderProducts