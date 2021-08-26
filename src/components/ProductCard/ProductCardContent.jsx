import { CardContent, makeStyles, Typography } from "@material-ui/core"
import FormattedPrice from "../FormattedPrice/FormattedPrice"

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    name: {
        width: "90%",
        margin: "auto",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }
})

const ProductCardContent = props => {
    const classes = useStyles()

    const { name, price } = props
    return <CardContent className={classes.root}>
        <Typography className={classes.name} variant="body2" component="h2" gutterBottom>
            {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
            <FormattedPrice price={price} />
        </Typography>
    </CardContent>
}

export default ProductCardContent