import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { Facebook } from "@material-ui/icons";
import InstagramIcon from '@material-ui/icons/Instagram';
import { facebookProvider, googleProvider } from "../../../firebase/useAuth";

const useStyles = makeStyles({
    button: {
        width: "100%",
        padding: ".8rem .5rem",
        marginBottom: "2rem",
        borderRadius: 0
    }
})

const SignInFooter = props => {
    const classes = useStyles()
    const { handleTabChange, onSignInWithSocialMedia } = props

    return <Box width="100%">
        {/* OTHER SIGN IN METHOD */}
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            size="large"
            startIcon={<InstagramIcon />}
            onClick={event => onSignInWithSocialMedia(event, googleProvider)}>
            ĐĂNG NHẬP VỚI GOOGLE
        </Button>

        <Button
            variant="contained"
            color="default"
            size="large"
            className={classes.button}
            onClick={event => onSignInWithSocialMedia(event, facebookProvider)}
            startIcon={<Facebook />}>
            ĐĂNG NHẬP VỚI FACEBOOK
        </Button>
        {/* SIGN UP */}
        <Box mb={3}>
            <Typography variant="h5" component="h3">BẠN LÀ KHÁCH HÀNG MỚI ?</Typography>
        </Box>
        <Button
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
            className={classes.button}
            variant="outlined"
            onClick={() => handleTabChange(1)}
        >ĐĂNG KÝ</Button>
    </Box>
}

export default SignInFooter