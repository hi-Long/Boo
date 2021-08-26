import { FormControl, MenuItem, Select } from "@material-ui/core"
import { orderStatuses } from "../../../dataStructure"

const OrderStatus = props => {
    const { row, onNewOrderStatus } = props
    return <FormControl>
        <Select
            value={row.status}
            onChange={event => onNewOrderStatus(event, row, event.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
        >
            {orderStatuses.map(status => (
                <MenuItem onClick={event => { event.stopPropagation() }} value={status}>{status}</MenuItem>
            ))}
        </Select>
    </FormControl>
}
export default OrderStatus