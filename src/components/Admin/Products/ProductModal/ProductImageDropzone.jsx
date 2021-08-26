import { Box, makeStyles } from '@material-ui/core'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ADMIN_PAGE_PRODUCT_IMG_INPUT } from '../../../../constants'

const useStyles = makeStyles(theme => ({
    root: {
        height: 300,
        border: "1px dashed lightgray",
        textAlign: "center",
        cursor: "pointer",
        transition: ".2s ease-in-out",
        "&:hover": {
            color: "white",
            backgroundColor: "teal"
        }
    }
}))

const ImageDropzone = props => {
    const { imagesDispatch } = props
    const classes = useStyles()

    const onDrop = useCallback(acceptedFiles => {
        imagesDispatch(ADMIN_PAGE_PRODUCT_IMG_INPUT, { url: URL.createObjectURL(acceptedFiles[0]), file: acceptedFiles[0] })
    }, [imagesDispatch])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Box className={classes.root} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </Box>
    )
}

export default ImageDropzone