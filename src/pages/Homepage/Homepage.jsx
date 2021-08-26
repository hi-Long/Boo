import PageLayout from "../../components/Layout/PageLayout";
import HomepageMain from "./components/HomepageMain";

const Homepage = props => {
    const { localStorageCart, setLocalStorageCart } = props
    return <PageLayout
        localStorageCart={localStorageCart}
        setLocalStorageCart={setLocalStorageCart}>
        <HomepageMain
            localStorageCart={localStorageCart}
            setLocalStorageCart={setLocalStorageCart}
        ></HomepageMain>
    </PageLayout>
}

export default Homepage