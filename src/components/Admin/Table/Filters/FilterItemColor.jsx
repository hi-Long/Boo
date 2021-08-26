import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        backgroundColor: props => props.color.id,

        "&:hover": {
            backgroundColor: props => props.color.id
        }
    }
})

const FilterItemColor = props => {
    const classes = useStyles(props)

    return <Button className={classes.root} variant="outlined">{props.color.name}</Button>
}

export default FilterItemColor