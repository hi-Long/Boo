
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core"
import { Fragment, useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { v4 } from "uuid"
import { ADMIN_PAGE_PRODUCT_COLOR_INPUT, ADMIN_PAGE_PRODUCT_DESC_INPUT, ADMIN_PAGE_PRODUCT_MATERIAL_INPUT, ADMIN_PAGE_PRODUCT_NAME_INPUT, ADMIN_PAGE_PRODUCT_PRICE_INPUT, ADMIN_PAGE_PRODUCT_SUB_INPUT } from "../../../../constants"
import { colors, materials, subcategories } from "../../../../dataStructure"
import useStorage from "../../../../firebase/useStorage"
import capitalizeFirstLetter from "../../../../helpers/capitalizeFirstLetter"
import { createProduct, deleteProduct, updateProduct } from "../../../../store/product-action"
import Confirmation from "../../../Confirmation/Confirmation"
import Fetching from "../../../Fetching/Fetching"

const useStyles = makeStyles({
    root: {
        "#price::-webkit-outer-spin-button": {
            webkitAppearance: "none",
            margin: 0
        },
        "#price::-webkit-inner-spin-button": {
            webkitAppearance: "none",
            margin: 0
        }
    }
})

const NewProductInfo = props => {
    const { formState, formDispatch,
        handleTabChange, initialState, modalType, concept,
        setProductModalShowing, setSnackbarShowing } = props
    const dispatch = useDispatch()
    const [confirmationShowing, setConfirmationShowing] = useState(false)
    const { upload } = useStorage()
    const [uploading, setUploading] = useState(false)
    const classes = useStyles()

    console.log(formState)

    const productDeleteHandler = () => {
        const productId = initialState.id
        const conceptId = initialState.concept
        dispatch(deleteProduct({ productId: productId, conceptId: conceptId }))
    }

    const imageUploadHandler = useCallback(async (mustUploadImages, notUploadImages) => {
        let downloadURLs = []
        // Create request promises
        const applyData = (urls => {
            downloadURLs = urls
        })
        const request = async () => {
            await upload(mustUploadImages, applyData)
        }
        try {
            await request()
            // Create new product obj
            const product = {
                name: formState.name.value,
                price: +formState.price.value * 1000,
                subcategories: formState.subcategories.value,
                color: formState.color,
                material: formState.material,
                description: formState.description.value,
                images: [...downloadURLs, ...notUploadImages]
            }
            let newProduct
            if (!initialState) {
                newProduct = {
                    ...product,
                    id: v4(),
                    concept: concept.id,
                    sold: 0,
                    click: 0,
                    added: 0
                }
            }
            let updatedProduct
            if (initialState) {
                updatedProduct = {
                    ...product,
                    id: initialState.id,
                    concept: initialState.concept,
                    sold: initialState.sold,
                    click: initialState.click,
                    added: initialState.added
                }
            }
            if (modalType === "update") {
                dispatch(updateProduct(updatedProduct))
            } else {
                formDispatch({ type: "RESET", payload: {} })
                dispatch(createProduct(newProduct))
            }
            handleTabChange(0)
            setSnackbarShowing(true)
        } catch (err) {
            console.log(err)
        }
    }, [upload, dispatch, formState, modalType, initialState, concept, setSnackbarShowing, formDispatch, handleTabChange])

    const onNewProductSubmit = useCallback(async event => {
        event.preventDefault()
        setUploading(true)
        // Filter images upload from links
        const images = formState.images
        const mustUploadImages = images.filter(image => image.file)
        const notUploadImages = images.filter(image => !image.file)
        // Upload images to firestore
        try {
            await imageUploadHandler(mustUploadImages, notUploadImages)
            setProductModalShowing(false)
            setUploading(false)
        } catch (err) {
            console.log(err)
        }
    }, [formState, imageUploadHandler, setProductModalShowing])

    if (uploading) {
        return <Fetching />
    }

    return <Fragment>
        <form
            className={classes.root}
            onSubmit={event => onNewProductSubmit(event)}>
            <Grid container spacing={5}>
                <Grid item sm={4}>
                    <Grid container spacing={2}>
                        {/* NAME */}
                        <Grid item sm={12}>
                            <TextField
                                required
                                id="name"
                                label="Tên sản phẩm"
                                defaultValue={formState.name.value}
                                placeholder="ÁO PHÔNG X"
                                onChange={event => formDispatch({ type: ADMIN_PAGE_PRODUCT_NAME_INPUT, payload: event.target.value })}
                            />
                        </Grid>
                        {/* PRICE */}
                        <Grid item sm={7}>
                            <TextField
                                id="price"
                                type="number"
                                required
                                value={formState.price.value}
                                label="Giá"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">.000đ</InputAdornment>
                                    ),
                                }}
                                onChange={event => formDispatch({ type: ADMIN_PAGE_PRODUCT_PRICE_INPUT, payload: +event.target.value })}
                            />
                        </Grid>
                        {/* SUBCATE */}
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="subcategory-select-label">Phân loại</InputLabel>
                                <Select
                                    labelId="subcategory-select-label"
                                    id="subcategory-select"
                                    required
                                    fullWidth
                                    value={formState.subcategories.value}
                                    onChange={event => formDispatch({ type: ADMIN_PAGE_PRODUCT_SUB_INPUT, payload: event.target.value })}
                                >
                                    {subcategories.map(subcate => (
                                        <MenuItem
                                            key={subcate.id}
                                            value={capitalizeFirstLetter(subcate.name.toLowerCase())}
                                            selected={formState.subcategories.value === capitalizeFirstLetter(subcate.name.toLowerCase())}>{capitalizeFirstLetter(subcate.name.toLowerCase())}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* COLOR */}
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="color-select-label">Màu sắc</InputLabel>
                                <Select
                                    labelId="color-select-label"
                                    id="color-select"
                                    required
                                    fullWidth
                                    value={formState.color}
                                    onChange={event => formDispatch({ type: ADMIN_PAGE_PRODUCT_COLOR_INPUT, payload: event.target.value })}
                                >
                                    {colors.map(color => (
                                        <MenuItem key={color.id} value={color.name}>{color.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* MATERIAL */}
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <InputLabel id="material-select-label">Chất liệu</InputLabel>
                                <Select
                                    labelId="material-select-label"
                                    id="material-select"
                                    required
                                    fullWidth
                                    value={formState.material}
                                    onChange={event => formDispatch({ type: ADMIN_PAGE_PRODUCT_MATERIAL_INPUT, payload: event.target.value })}>
                                    {materials.map(material => (
                                        <MenuItem key={material.id} value={material.name}>{material.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                {/* DETAILS */}
                <Grid item sm={8}>
                    <TextField
                        id="standard-multiline-static"
                        label="Chi tiết sản phẩm"
                        required
                        multiline
                        rows={15}
                        fullWidth
                        defaultValue={formState.description.value}
                        onChange={event => formDispatch({ type: ADMIN_PAGE_PRODUCT_DESC_INPUT, payload: event.target.value })}
                    />
                </Grid>
            </Grid>
            {/* BUTTONS */}
            <Box display="flex" justifyContent="space-between" pt={3} mt={5}>
                <Button
                    variant="outlined" color="primary"
                    onClick={() => handleTabChange(0)}>Quay lại</Button>
                {modalType === "update" && <Button onClick={() => setConfirmationShowing(true)}>Xóa sản phẩm</Button>}
                <Button variant="contained" type="submit" color="secondary">Hoàn tất</Button>
            </Box>
        </form>

        <Confirmation
            confirmationShowing={confirmationShowing}
            setConfirmationShowing={setConfirmationShowing}
            title="Xoá sản phẩm"
            content="Bạn chắc chắn muốn xóa sản phẩm này chứ"
            confirm="Xóa"
            cancel="Hủy bỏ"
            confirmActions={productDeleteHandler} />
    </Fragment>
}

export default NewProductInfo