import { Box, IconButton, makeStyles, Typography } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import { useState } from "react";
import FilterItem from "./FilterItem";

const useStyles = makeStyles(theme => ({
    root: {

    },
    items: {
        gap: theme.spacing(2)
    }
}))

const FilterField = props => {
    const classes = useStyles()
    const { field, items } = props.field
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState)
    }

    return <Box className={classes.root} overflow="hidden" m={3} mx={3} mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" component="span">{field.name}</Typography>
            <IconButton aria-label="expand"
                onClick={toggleExpand}>
                <AddIcon />
            </IconButton>
        </Box>
        <Box className={classes.items} display="flex" flexWrap={isExpanded ? "wrap" : "nowrap"}>
            {items && items.map(item => (
                <Box flexShrink={0} key={item.value}>
                    <FilterItem field={field} item={item}>{item.name}</FilterItem>
                </Box>
            ))}
        </Box>
    </Box>
}

export default FilterField