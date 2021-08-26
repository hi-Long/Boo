import { Backdrop, Box, Button, Collapse } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import CartItem from '../CartItem/CartItem';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: "1rem",
        right: "2rem",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
}));

const CartItemAddedSnackbar = props => {
    const { product } = props
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    const body = (
        <div className={classes.paper}>
            <Collapse
                in={product ? true : false}
                timeout="auto"
                collapsedSize={0}
                unmountOnExit>
                <h2 id="simple-modal-title">THÊM SẢN PHẨM THÀNH CÔNG</h2>
                <CartItem justAdded={true} product={{ item: product, quantity: 0 }} />
            </Collapse>
            <Box fontWeight="fontWeightRegular">
                <Button variant="contained" color="secondary" size="large" href="/checkout/auth" fullWidth>Tiến hành đặt hàng</Button>
            </Box>
        </div >
    );

    return (
        <div>
            <Modal
                open={product ? true : false}
                aria-labelledby="add-cart-modal-title"
                aria-describedby="add-cart-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {body}
            </Modal>
        </div>
    );
}

export default CartItemAddedSnackbar