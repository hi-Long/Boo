import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";
import OrderProducts from "./OrderProducts";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        maxHeight: 600,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5,
        overflow: "auto",
        boxShadow: theme.shadows[3],
    },
}));

const OrderDetailsModal = props => {
    const { order, detailsShowing, setDetailsShowing } = props
    const classes = useStyles();

    return <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={detailsShowing}
        onClose={() => setDetailsShowing(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={detailsShowing}>
            <div className={classes.paper}>
                <OrderProducts adminPageOrder={order} />
            </div>
        </Fade>
    </Modal>

}

export default OrderDetailsModal