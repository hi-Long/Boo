import { makeStyles, TextField } from '@material-ui/core'
import { useState } from 'react'
import { ADMIN_PAGE_PRODUCT_IMG_INPUT } from '../../../../constants'

const useStyles = makeStyles(theme => ({
    input: {
        marginInline: "1rem",
    },
}))

const ImageUploadURL = props => {
    const { imagesDispatch } = props
    const classes = useStyles()
    const [inputURL, setInputURL] = useState('')
    const [error, setError] = useState(false)

    const onInputChanged = event => {
        if (event.key === "Enter") {
            onImageUploaded()
        } else {
            setInputURL(event.target.value)
            setError(false)
        }
    }

    const onImageUploaded = () => {
        if (inputURL.trim() !== '') {
            imagesDispatch(ADMIN_PAGE_PRODUCT_IMG_INPUT, { url: inputURL })
        } else {
            setError(true)
        }
    }

    return <div className={classes.root}>
        <TextField
            className={classes.input}
            error={error}
            id="img-input" placeholder="Nhấn Enter để upload"
            onChange={event => setInputURL(event.target.value)}
            onKeyDown={event => onInputChanged(event)}
        />
    </div>
}

export default ImageUploadURL