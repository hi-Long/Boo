import { IconButton, makeStyles } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { ADMIN_PAGE_PRODUCT_IMG_INPUT } from '../../../../constants'

const useStyles = makeStyles(theme => ({
    input: {
        display: 'none',
    },
}))

const ImageUploadButton = props => {
    const { imagesDispatch } = props
    const classes = useStyles()

    const onImageUploaded = event => {
        const files = event.target.files
        imagesDispatch(ADMIN_PAGE_PRODUCT_IMG_INPUT, { url: URL.createObjectURL(files[0]), file: files[0] })
    }

    return <div className={classes.root}>
        <input
            accept="image/*"
            className={classes.input}
            id="image-upload"
            multiple
            type="file"
            onChange={event => onImageUploaded(event)}
        />
        <label htmlFor="image-upload">
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
        </label>
    </div>
}

export default ImageUploadButton