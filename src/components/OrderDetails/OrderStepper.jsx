import { Box } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}));

const steps = ['Đơn hàng mới', 'Đang xử lý', 'Đang giao hàng', 'Hoàn thành'];

const OrderStepper = props => {
    const { status } = props
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(steps.indexOf(status));

    useEffect(() => {
        setActiveStep(steps.indexOf(status))
    }, [status])

    return <Box className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </Box>
}

export default OrderStepper