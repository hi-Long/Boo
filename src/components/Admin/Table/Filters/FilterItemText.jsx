import { Button } from "@material-ui/core"
import { useState } from "react"
import capitalizeFirstLetter from "../../../../helpers/capitalizeFirstLetter"

const FilterItemText = props => {
    const { onSelected, selectedItems, children } = props
    const name = capitalizeFirstLetter(children.toLowerCase())
    const [selected, setSelected] = useState(selectedItems.includes(name))

    return <Button
        variant={selected && "contained"}
        color="primary"
        onClick={() => {
            if (selected) {
                onSelected(selectedItems.filter(i => i !== name))
            } else {
                onSelected([...selectedItems, name])
            }
            setSelected(prevState => !prevState)
        }}
    >{children}</Button>
}

export default FilterItemText