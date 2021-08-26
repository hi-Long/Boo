import { makeStyles, Typography } from "@material-ui/core"
import DetailsModalTabLayout from "./DetailsModalTabLayout"

const useStyles = makeStyles({
    content: {
        lineHeight: "2rem"
    }
})

const DetailModalTabPreservation = props => {
    const { product } = props
    const classes = useStyles()

    return <DetailsModalTabLayout
        image={product.images[1].url}
        price={product.price}
        name={product.name}
    >
        <Typography className={classes.content} variant="body2" component="p">
            Để quần áo bền hơn, bạn lưu ý:
            <br />
            - Không ngâm trong chất tẩy rửa quá 10 phút.
            <br />
            - Giặt ở nhiệt độ nước không quá 30°C.
            <br />
            - Ủi ở nhiệt độ không quá 150°C.
            <br />
            - Không dùng thuốc tẩy.
            <br />
            - Không phơi trực tiếp dưới ánh sáng mặt trời.
            <br />
        </Typography>
    </DetailsModalTabLayout>
}

export default DetailModalTabPreservation