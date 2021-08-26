import { Box, Divider } from "@material-ui/core"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import FilterField from "./FilterField"
import FilterItemPrice from "./FilterItemPrice"
import { colors, materials } from "../../../dataStructure"

const FiltersBody = props => {
    const concepts = useSelector(state => state.product.concepts)

    const filterFields = [
        {
            field: {
                name: "SẮP XẾP THEO",
                value: 'order'
            },
            items: [
                { name: "Mới nhất", value: "date" },
                { name: "Giá tăng dần", value: "asc" },
                { name: "Giá giảm dần", value: "desc" }
            ]
        },
        {
            field: {
                name: "BỘ SƯU TẬP",
                value: 'concepts'
            },
            items: concepts.map(c => { return { name: c.name, value: c.id } })
        },
        {
            field: {
                name: "MÀU SẮC",
                value: 'colors'
            },
            items: colors.map(c => { return { name: c.name, value: c.name } })
        },
        {
            field: {
                name: "CHẤT LIỆU",
                value: 'materials'
            },
            items: materials.map(m => { return { name: m.name, value: m.name } })
        }
    ]

    return <Box flexGrow={1} overflow="auto">
        {filterFields.map(field => (
            <Fragment key={field.field.name}>
                <FilterField field={field} ></FilterField>
                <Divider></Divider>
            </Fragment>
        ))}
        <FilterItemPrice />
    </Box>
}

export default FiltersBody