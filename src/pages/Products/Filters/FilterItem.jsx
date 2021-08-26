import { Box, Button, makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchActions } from "../../../store/search-slice"

const useStyles = makeStyles({
    root: {
        border: "1px solid lightgray"
    },
    selected: {
        backgroundColor: "black",
        color: "white",
        "&:hover": {
            backgroundColor: "black",
            color: "white"
        }
    }
})

const FilterItem = props => {
    const { field, item } = props
    const [isSelected, setIsSelected] = useState(false)
    const params = useSelector(state => state.search.params)
    const dispatch = useDispatch()
    const classes = useStyles({ ...props, isSelected })

    const toggleSelected = () => {
        setIsSelected(prevState => !prevState)
        const param = field.value
        const name = item.name
        const value = item.value
        switch (param) {
            case 'order':
                if (name === 'Mới nhất') {
                    dispatch(searchActions.setSort('date'))
                    dispatch(searchActions.setOrder('date'))
                } else {
                    dispatch(searchActions.setSort('price'))
                    dispatch(searchActions.setOrder(value))
                }
                break
            case 'concepts':
                dispatch(searchActions.setConcepts(value))
                break
            case 'colors':
                dispatch(searchActions.setColors(value))
                break
            case 'materials':
                dispatch(searchActions.setMaterials(value))
                break
            default:
                break
        }
    }

    console.log(field, item)

    return <Button
        variant="outlined"
        className={clsx(classes.root, (params[field.value].includes(item.value) || params[field.value] === item.value) && classes.selected)}
        onClick={toggleSelected} >
        <Box fontWeight="fontWeightLight">
            {props.children}
        </Box>
    </Button >
}

export default FilterItem