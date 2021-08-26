import { makeStyles } from "@material-ui/core"
import HomepageBanners from "./HomepageBanners"
import HomepageCategories from "./HomepageCategories"
import HomepageSignUpForm from "./HomepageSignUpForm"
import HomepageCarousels from "./HomepageCarousels"

const useStyles = makeStyles({
    root: {
        overflowX: "hidden"
    }
})

const HomepageMain = props => {
    const { localStorageCart, setLocalStorageCart } = props
    const classes = useStyles()
    return <main className={classes.root}>
        <HomepageBanners />
        <HomepageCategories />
        <HomepageCarousels
            localStorageCart={localStorageCart}
            setLocalStorageCart={setLocalStorageCart} />
        <HomepageSignUpForm />
    </main>
}

export default HomepageMain