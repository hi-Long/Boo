import { Grid, Typography } from "@material-ui/core"
import { Fragment } from "react"
import DetailsModalTabLayout from "./DetailsModalTabLayout"


const DetailsModalTabSpecs = props => {
    const { product } = props

    const specs = [
        { name: "Mã sản phẩm", value: product.id },
        { name: "Chất liệu", value: product.material },
        { name: "Loại", value: product.subcategories },
        { name: "Màu sắc", value: product.color },
        { name: "Mùa", value: product.concept }
    ]

    return <DetailsModalTabLayout
        image={product.images[0].url}
        price={product.price}
        name={product.name}>
        <Grid container spacing={3}>
            {specs.map(spec => (
                <Fragment>
                    <Grid item sm={4}>
                        <Typography variant="body2">- {spec.name}:</Typography>
                    </Grid>
                    <Grid item sm={8}>
                        <Typography variant="body2">{spec.value}</Typography>
                    </Grid>
                </Fragment>
            ))}
        </Grid>
    </DetailsModalTabLayout>
}

export default DetailsModalTabSpecs