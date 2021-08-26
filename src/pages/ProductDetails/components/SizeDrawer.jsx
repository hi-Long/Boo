import { Box, Drawer, IconButton } from "@material-ui/core"
import { CloseOutlined } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import { PRODUCTS_DETAILS_IMAGES_SRC } from "../../../constants"
import { uiActions } from "../../../store/ui-slice"

const SizeDrawer = () => {
    const dispatch = useDispatch()
    const { sizeDrawerShowing } = useSelector(state => state.ui)

    const toggleSizeDrawer = value => {
        dispatch(uiActions.setSizeDrawerShowing(value))
    }

    return <Drawer anchor="bottom" open={sizeDrawerShowing} onClose={() => toggleSizeDrawer(false)}>
        <img src={`${PRODUCTS_DETAILS_IMAGES_SRC}/size.png`} alt="Size"></img>
        <Box position="absolute" top={20} right={20}>
            <IconButton>
                <CloseOutlined onClick={() => toggleSizeDrawer(false)}></CloseOutlined>
            </IconButton>
        </Box>
    </Drawer>
}

export default SizeDrawer