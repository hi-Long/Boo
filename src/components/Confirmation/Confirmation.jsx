import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Confirmation = props => {
    const { title, content, confirm, cancel, confirmActions, confirmationShowing, setConfirmationShowing } = props

    const handleClose = () => {
        setConfirmationShowing(false)
    }

    const onConfirmHandler = () => {
        confirmActions()
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={confirmationShowing}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {cancel}
                    </Button>
                    <Button variant="contained" onClick={onConfirmHandler} color="primary" disableElevation autoFocus>
                        {confirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Confirmation