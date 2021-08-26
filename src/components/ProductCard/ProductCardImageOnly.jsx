import { Box, Card, CardActionArea } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import ProductImage from "./CardMedia"

const ProductCardImageOnly = props => {
    const { product } = props
    const history = useHistory()

    const onCardClick = () => {
        history.push('/products/' + product.to)
    }

    return <Box p={.5}>
        <Card onClick={onCardClick}>
            <CardActionArea>
                <ProductImage
                    image={product.image}
                    height={300} />
            </CardActionArea>
        </Card>
    </Box>
}

export default ProductCardImageOnly
