import { colors, materials, subcategories } from "../../../dataStructure"
import Filters from "../Table/Filters/Filters"

const ProductsFilters = props => {
    const {
        selectedSubcates, setSubcates,
        selectedColors, setColors,
        selectedMaterials, setMaterials,
        filtersIsOpened } = props

    const filters = [
        {
            label: "Danh mục",
            items: subcategories,
            filterItemType: "text",
            selectedItems: selectedSubcates,
            onSelected: setSubcates
        },
        {
            label: "Màu sắc",
            items: colors,
            filterItemType: "color",
            selectedItems: selectedColors,
            onSelected: setColors
        },
        {
            label: "Chất liệu",
            items: materials,
            filterItemType: "text",
            selectedItems: selectedMaterials,
            onSelected: setMaterials
        }
    ]

    return <Filters
        filtersIsOpened={filtersIsOpened}
        filters={filters} />
}

export default ProductsFilters