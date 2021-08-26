import { Typography } from "@material-ui/core"
import DetailsModalTabLayout from "./DetailsModalTabLayout"

const DetailsModalTabExchange = props => {
    const { product } = props

    return <DetailsModalTabLayout
        image={product.images[2].url}
        price={product.price}
        name={product.name}>
        <Typography variant="body2" component="p" style={{ lineHeight: "2rem" }}>
            - Đổi hàng trong vòng 15 ngày trên toàn quốc (áp dụng sản phẩm nguyên giá)
            <br />
            - Bảo hành trong 90 ngày với các lỗi kỹ thuật, bảo hành hình in trong 365 ngày.
        </Typography>
    </DetailsModalTabLayout>
}

export default DetailsModalTabExchange