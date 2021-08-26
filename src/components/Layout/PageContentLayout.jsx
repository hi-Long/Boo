import { Box } from "@material-ui/core"

const PageContentLayout = props => {
    return <Box mt={10} px={5} {...props.extra}>
        {props.children}
    </Box>
}

export default PageContentLayout
