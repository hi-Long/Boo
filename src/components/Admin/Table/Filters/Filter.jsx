import { Box, Grid, makeStyles, Typography } from "@material-ui/core"
import FilterItemText from "./FilterItemText"

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        marginBlock: ".5rem",
        marginLeft: "0rem"
    },
    items: {
        display: "flex",
        gap: "1rem",
    }
})

const ProductFilter = props => {
    const { label, items, onSelected, selectedItems } = props

    const classes = useStyles()

    return <Grid className={classes.root} container spacing={4}>
        <Grid item sm={1}>
            <Typography variant="subtitle1" component="h4">{label}</Typography>
        </Grid>
        <Grid item sm={10}>
            <Box className={classes.items} flexWrap="wrap">
                {items.map(item => {
                    return (
                        <FilterItemText
                            onSelected={onSelected}
                            selectedItems={selectedItems}>{item.name}</FilterItemText>
                    )
                })}
            </Box>
        </Grid>
    </Grid >
}

export default ProductFilter