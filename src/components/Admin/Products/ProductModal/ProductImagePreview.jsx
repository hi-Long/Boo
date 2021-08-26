import { Box, IconButton, makeStyles } from "@material-ui/core"
import ClearIcon from '@material-ui/icons/Clear'
import { ADMIN_PAGE_PRODUCT_IMG_DELETE } from "../../../../constants"

const useStyles = makeStyles({
    root: {
        position: "relative",
        "&:hover .MuiButtonBase-root": {
            transform: "translate(-50%, -10%)",
            opacity: 1
        }
    },
    button: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translate(-50%, 50%)",
        background: "white",
        opacity: 0,
        transition: ".2s",

        "&:hover": {
            background: "white"
        }
    }
})

const ProductImagePreview = props => {
    const { src, imagesDispatch } = props
    const classes = useStyles()

    const onImageDelete = () => {
        imagesDispatch(ADMIN_PAGE_PRODUCT_IMG_DELETE, src)
    }

    return <Box className={classes.root}>
        <Box display="flex" justifyContent="center">
            <img width="200" height="300" src={src} alt="Product"></img>
        </Box>
        <IconButton className={classes.button} onClick={onImageDelete}>
            <ClearIcon color="error" />
        </IconButton>
    </Box>
}

export default ProductImagePreview