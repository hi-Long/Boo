import { Box, Divider, Typography } from "@material-ui/core"

const AccountComponentLayout = props => {
    return <Box component="section">
        <Box component="header" mb={2}>
            <Typography variant="h5" component="h2">
                <Box mb={3}>{props.header}</Box>
            </Typography>
            <Divider />
        </Box>
        {props.children}
    </Box>
}

export default AccountComponentLayout