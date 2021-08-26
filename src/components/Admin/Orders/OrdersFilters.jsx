import { orderStatuses, paymentMethods } from "../../../dataStructure"
import Filters from "../Table/Filters/Filters"

const OrdersFilters = props => {
    const {
        selectedStatus, setStatus,
        selectedPayments, setPayments,
        filtersIsOpened } = props

    const filters = [
        {
            label: "Trạng thái",
            items: orderStatuses.map(o => { return { name: o } }),
            filterItemType: "text",
            selectedItems: selectedStatus,
            onSelected: setStatus
        },
        {
            label: "Phương thức",
            items: paymentMethods.map(p => { return { name: p } }),
            filterItemType: "text",
            selectedItems: selectedPayments,
            onSelected: setPayments
        }
    ]

    return <Filters
        filtersIsOpened={filtersIsOpened}
        filters={filters} />
}

export default OrdersFilters