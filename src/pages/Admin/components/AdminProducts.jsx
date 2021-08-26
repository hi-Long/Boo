
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Concepts from "../../../components/Admin/Products/Concept/Concepts"
import NewConcept from "../../../components/Admin/Products/NewConcept"
import ProductsTable from "../../../components/Admin/Products/ProductsTable"
import CustomizedSnackbar from "../../../components/CustomizedSnackbar/CustomizedSnackbar"
import PageContentLayout from "../../../components/Layout/PageContentLayout"
import { fetchConcepts } from "../../../store/product-action"

const AdminProducts = props => {
    const dispatch = useDispatch()
    const concepts = useSelector(state => state.product.concepts)
    const [snackBarShowing, setSnackbarShowing] = useState(false)

    useEffect(() => {
        dispatch(fetchConcepts())
    }, [dispatch])

    return <PageContentLayout>
        <NewConcept />
        {concepts.map(concept => (
            <Concepts
                snackBarShowing={snackBarShowing}
                setSnackbarShowing={setSnackbarShowing}
                key={concept.id} concept={concept} />
        ))}
        <ProductsTable />
        <CustomizedSnackbar
            showing={snackBarShowing}
            setShowing={setSnackbarShowing}
            message="Thao tác thành công"
            severity="success" />
    </PageContentLayout>
}

export default AdminProducts