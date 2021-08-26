import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const CustomizedSnackbar = props => {
    const { message, severity, showing, setShowing } = props
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowing(false)
    };

    return (
        <div className={classes.root}>
            <Snackbar open={showing} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{message}</Alert>
            </Snackbar>
        </div>
    );
}

export default React.memo(CustomizedSnackbar)