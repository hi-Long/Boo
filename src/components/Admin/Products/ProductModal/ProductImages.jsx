import { Box, Button, makeStyles } from "@material-ui/core"
import ProductCarousel from "../../../ProductCarousel/ProductCarousel"
import ImageUploadButton from "./ImageUploadButton"
import ImageUploadURL from "./ImageUploadUrl"
import ProductImageDropzone from "./ProductImageDropzone"
import ProductImagePreview from "./ProductImagePreview"

const useStyles = makeStyles({
})

const ProductImages = props => {
    const { images, imagesDispatch, handleTabChange, setProductModalShowing, setSnackbarShowing } = props
    const noImages = images.length
    const classes = useStyles()

    const nextButtonClickHandler = () => {
        if (noImages === 0) {
            setSnackbarShowing(true)
        } else {
            handleTabChange(1)
        }
    }

    return <Box className={classes.root}>
        <ProductCarousel slidesToShow={noImages !== 0 ? noImages <= 2 ? noImages : 2 : 1}>
            {noImages === 0
                ? <ProductImageDropzone imagesDispatch={imagesDispatch} />
                : images.map((image, i) => (
                    <ProductImagePreview key={i} src={image.url} imagesDispatch={imagesDispatch} />
                ))
            }
        </ProductCarousel>
        <Box mt={8} classes={classes.actions} width="100%" display="flex" alignItems="center" justifyContent="space-between">
            <Button
                variant="contained" color="primary"
                onClick={() => {
                    console.log("asas")
                    setProductModalShowing(false)
                }}>Đóng</Button>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <ImageUploadButton imagesDispatch={imagesDispatch} />
                <ImageUploadURL imagesDispatch={imagesDispatch} />
            </Box>
            <Button
                variant="contained" color="secondary"
                onClick={() => nextButtonClickHandler()}>Tiếp tục</Button>
        </Box>
    </Box>
}

export default ProductImages