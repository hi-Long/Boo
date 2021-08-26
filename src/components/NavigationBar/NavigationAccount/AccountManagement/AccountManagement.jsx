import { Box } from "@material-ui/core"
import AccountManagementBody from "./AccountManagementBody"
import AccountManagementFooter from "./AccountManagementFooter"
import AccountManagementHeader from "./AccountManagementHeader"

const AccountManagement = props => {
    return <Box pb={5}>
        <AccountManagementHeader />
        <AccountManagementBody />
        <AccountManagementFooter />
    </Box>
}

export default AccountManagement