import { AppBar, Backdrop, Box, Fade, makeStyles, Modal, Tab, Tabs } from "@material-ui/core"
import { Fragment } from "react"
import { useReducer, useState } from "react"
import TabPanel from "../../../Auth/AuthTabs/TabPanel"
import CustomizedSnackbar from "../../../CustomizedSnackbar/CustomizedSnackbar"
import ProductImages from "./ProductImages"
import ProductInfo from "./ProductInfo"
import { formReducer, initialFormState } from "./productReducer"

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        width: "50%",
        height: "80%",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        borderRadius: 5,
        boxShadow: theme.shadows[5],
    },
    tabsNav: {
        backgroundColor: "white",
        color: "dimgray",
        boxShadow: "none",

        "& .MuiTabs-flexContainer": {
            justifyContent: "center"
        }
    }
}))

const a11yProps = index => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProductModal = props => {
    const { concept, type, initialState,
        productModalShowing, onProductModalClose, setProductModalShowing, setSnackbarShowing } = props

    const [value, setValue] = useState(0);
    const [noImgsnackBarShowing, setNoImgSnackBarShowing] = useState(false)
    const [formState, formDispatch] = useReducer(formReducer, initialFormState, () => {
        if (initialState) {
            return {
                name: {
                    value: initialState.name,
                    valid: false
                },
                price: {
                    value: initialState.price,
                    valid: false
                },
                concept: initialState.concept,
                subcategories: {
                    value: initialState.subcategories,
                    valid: false
                },
                color: initialState.color,
                material: initialState.material,
                description: {
                    value: initialState.description,
                    valid: false
                },
                images: initialState.images ? initialState.images : []
            }
        } else {
            return initialFormState
        }
    })
    const classes = useStyles()

    const handleTabChangeByButtons = (newValue) => {
        setValue(newValue);
    };

    const handleTabChangeByTabs = (event, newValue) => {
        if (value === 1 && formState.images.length | (initialState && initialState.images.length)) {
            setValue(newValue);
        } else {
            setNoImgSnackBarShowing(true)
        }
    }

    const onImageUploaded = (type, path) => {
        formDispatch({ type: type, payload: path })
    }

    return <Fragment>
        <Modal
            aria-labelledby="admin-product-modal"
            aria-describedby="admin-product-modal"
            className={classes.modal}
            open={productModalShowing}
            onClose={() => onProductModalClose()}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={productModalShowing}>
                <div className={classes.paper}>
                    <div className={classes.tabs}>
                        <AppBar className={classes.tabsNav} position="static">
                            <Tabs value={value} onChange={handleTabChangeByTabs} aria-label="simple tabs example">
                                <Tab label="ẢNH SẢN PHẨM" {...a11yProps(0)} />
                                <Tab label="THÔNG TIN SẢN PHẨM" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <Box mt={5}>
                            <TabPanel value={value} index={0}>
                                <ProductImages
                                    modalType={type}
                                    setSnackbarShowing={setNoImgSnackBarShowing}
                                    setProductModalShowing={setProductModalShowing}
                                    handleTabChange={handleTabChangeByButtons}
                                    images={formState.images}
                                    imagesDispatch={onImageUploaded} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <ProductInfo
                                    setSnackbarShowing={setSnackbarShowing}
                                    concept={concept}
                                    modalType={type}
                                    initialState={initialState}
                                    setProductModalShowing={setProductModalShowing}
                                    formState={formState} formDispatch={formDispatch}
                                    handleTabChange={handleTabChangeByButtons} />
                            </TabPanel>
                        </Box>
                    </div>
                </div>

            </Fade>
        </Modal>

        <CustomizedSnackbar
            showing={noImgsnackBarShowing}
            setShowing={setNoImgSnackBarShowing}
            message="Chưa chọn ảnh sản phẩm"
            severity="error" />
    </Fragment>
}

export default ProductModal