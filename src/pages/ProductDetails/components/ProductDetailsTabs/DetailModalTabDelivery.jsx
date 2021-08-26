import { Box, Typography } from "@material-ui/core"
import DetailsModalTabLayout from "./DetailsModalTabLayout"

const areas = [
    { name: "Nội thành", subName: "Hà Nội và tp.Hồ Chí Minh", price: "25,000" },
    { name: "Ngoại thành", subName: "Các tỉnh khác", price: "35,000" }
]

const DetailModalTabDelivery = props => {
    const { product } = props

    return <DetailsModalTabLayout
        image={product.images[3].url}
        price={product.price}
        name={product.name}>
        {areas.map(area => (
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="body1" component="span">{area.name}</Typography>
                    <br></br>
                    <Typography variant="body2" component="span">{area.subName}</Typography>
                </Box>
                <Typography variant="body2" component="p">{area.price}đ</Typography>
            </Box>
        ))}
    </DetailsModalTabLayout>
}

export default DetailModalTabDelivery