import { Backdrop, Fade, makeStyles, Modal, Tab, Tabs, AppBar, Box } from "@material-ui/core"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uiActions } from "../../../../store/ui-slice"
import DetailModalTabDelivery from "../ProductDetailsTabs/DetailModalTabDelivery"
import DetailModalTabPreservation from "../ProductDetailsTabs/DetailModalTabPreservation"
import DetailsModalTabExchange from "../ProductDetailsTabs/DetailsModalTabExchange"
import DetailsModalTabSpecs from "../ProductDetailsTabs/DetailsModalTabSpecs"
import TabPanel from "../../../../components/Auth/AuthTabs/TabPanel"

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

        "& .MuiTabs-flexContainer": { justifyContent: "center" }
    }
}))

const a11yProps = index => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProductDetailsModal = props => {
    const { product } = props
    const dispatch = useDispatch()
    const detailsModalShowing = useSelector(state => state.ui.detailsModalShowing)
    const [value, setValue] = useState(0);

    const tabs = [
        <DetailsModalTabSpecs product={product} />,
        <DetailModalTabPreservation product={product} />,
        <DetailModalTabDelivery product={product} />,
        <DetailsModalTabExchange product={product} />,
    ]

    const classes = useStyles()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleDetailsModal = value => {
        dispatch(uiActions.setDetailsModalShowing(value))
    }

    return <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={detailsModalShowing}
        onClose={() => toggleDetailsModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={detailsModalShowing}>
            <div className={classes.paper}>
                <div className={classes.tabs}>
                    {/* HEADERS */}
                    <AppBar className={classes.tabsNav} position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="THÔNG TIN CHI TIẾT" {...a11yProps(0)} />
                            <Tab label="BẢO QUẢN" {...a11yProps(1)} />
                            <Tab label="GIAO HÀNG" {...a11yProps(2)} />
                            <Tab label="ĐỔI HÀNG" {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    {/* TABS */}
                    <Box mt={5}>
                        {tabs.map((tab, i) => (
                            <TabPanel value={value} index={i} key={i}>
                                {tab}
                            </TabPanel>
                        ))}
                    </Box>
                </div>
            </div>
        </Fade>
    </Modal>
}

export default ProductDetailsModal