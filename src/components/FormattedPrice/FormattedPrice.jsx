
import { FormattedNumber } from "react-intl"

const FormattedPrice = props => {
    const { price } = props

    return <FormattedNumber
        value={price}
        currency="VND" />
}

export default FormattedPrice