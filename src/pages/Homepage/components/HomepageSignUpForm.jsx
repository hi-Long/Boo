import { Box, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        backgroundImage: 'linear-gradient(90deg, red, blue)',
        backgroundPosition: "bottom left",
        backgroundSize: "0% 3px",
        backgroundRepeat: "no-repeat",
        transition: ".2s ease-in-out",
        cursor: 'pointer',

        "&:hover": {
            backgroundSize: "100% 3px"
        }
    }
})

const HomepageSignUpForm = props => {
    const classes = useStyles()

    return <Box
        display="flex" flexDirection="column" alignItems="center"
        my={5} pt={5}>
        <Typography className={classes.root} variant="h5" component="h3">ĐĂNG KÝ THÀNH VIÊN MỚI</Typography>
    </Box>
}

export default HomepageSignUpForm