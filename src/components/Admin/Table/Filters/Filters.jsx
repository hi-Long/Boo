import { Collapse } from "@material-ui/core"
import Filter from "./Filter"

const Filters = props => {
    const { filtersIsOpened, filters } = props

    return <Collapse in={filtersIsOpened} timeout="auto" unmountOnExit>
        {filters.map(f => (
            <Filter {...f} />
        ))}
    </Collapse>
}

export default Filters