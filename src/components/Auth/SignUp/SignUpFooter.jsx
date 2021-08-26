import { Box, Button, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles({
    button: {
        width: "100%",
        padding: ".8rem .5rem",
        marginBottom: "2rem",
        borderRadius: 0
    }
})

const SignUpFooter = props => {
    const classes = useStyles()
    const { handleTabChange } = props

    return <Box width="100%">
        <Box mb={3}>
            <Typography variant="h5" component="h3">Bạn đã có tài khoản ?</Typography>
        </Box>
        <Button
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
            className={classes.button}
            variant="outlined"
            onClick={() => handleTabChange(0)}
        >ĐĂNG NHẬP</Button>
    </Box>
}

export default SignUpFooter