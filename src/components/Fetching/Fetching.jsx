import { Box, CircularProgress } from "@material-ui/core"

const Fetching = props => {
    return <Box display="flex" justifyContent="center" mt={10} {...props}>
        <CircularProgress />
    </Box>
}

export default Fetching