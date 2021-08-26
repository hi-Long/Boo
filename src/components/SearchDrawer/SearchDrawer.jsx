import { Box, Container, Drawer, Grid, makeStyles } from "@material-ui/core"
import { useState } from "react"
import Logo from "../Logo/Logo"
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import TrendingKeywords from "./TrendingKeywords";
import SearchDrawerInput from "./SearchInput";
import SearchDrawerResults from "./SearchDrawerResults";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../../store/search-slice";
import useDebounce from "../../hooks/useDebounce";
import { searchProductsByName } from "../../store/search-action";
import { useCallback } from "react";
import ProductCardImageOnly from "../ProductCard/ProductCardImageOnly";
import { uiActions } from "../../store/ui-slice";

const carouselProducts = [
    { image: "https://cdn.boo.vn/products/4465/ao-so-mi-nam-denim-ngan-tay-8odkh-1.jpg", to: "ccdaab58-8e2e-43ec-a2c8-745b5e6493d5" },
    { image: "https://cdn.boo.vn/products/4446/ao-so-mi-nam-loose-co-scuba-nt-967yj-1.jpg", to: "a3ab5ca0-8e33-41ba-b7b9-873dc6eba73e" },
    { image: "https://cdn.boo.vn/products/4437/ao-phong-nam-regular-co-henley-solidtrangwhitetrang-1.jpg", to: "6501956a-98be-48a6-8b8d-71fe8f1cbffc" },
    { image: "https://cdn.boo.vn/products/348/quan-short-nam-relax-lacoste-melangexam-graytan-nhat-1.jpg", to: "93368448-f70f-4425-8307-ba1501397f2e" },
    { image: "https://cdn.boo.vn/products/4522/quan-short-nam-loose-tui-hop-4upcw-3.jpg", to: "2c529613-5c44-4c8f-aac1-dea1cf2e8332" },
    { image: "https://cdn.boo.vn/products/3305/sweater-ao-len-ma-basic-regular-van-thung-solidxam-grayghi-tan-4.jpg", to: "150b2e09-233d-4107-a440-717d4e4fe31c" }
]

const useStyles = makeStyles({
    root: {
        "& .MuiDrawer-paper": {
            paddingBlock: "1rem",
            gap: "2rem"
        }
    }
})

const SearchDrawer = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const searchDrawerShowing = useSelector(state => state.ui.searchDrawerShowing)
    const [searchText, setSearchText] = useState('')
    const [touch, setTouch] = useState(false)

    const searchTextOnChange = useCallback(() => {
        if (searchText === '' && touch) {
            dispatch(searchActions.resetResults())
        } else if (searchText !== '' && touch) {
            dispatch(searchProductsByName(searchText))
        }
    }, [dispatch, searchText, touch])

    useDebounce(searchText, searchTextOnChange, 500)

    return <Drawer
        className={classes.root}
        display="flex"
        anchor="top"
        open={searchDrawerShowing}
        onClose={() => dispatch(uiActions.setSearchDrawerShowing((false)))}>
        <Logo></Logo>
        <Container maxWidth="md">
            {/* SEARCH INPUT + RESULTS */}
            <Box position="relative">
                <SearchDrawerInput setTouch={setTouch} setSearchText={setSearchText}></SearchDrawerInput>
                <SearchDrawerResults searchText={searchText}></SearchDrawerResults>
            </Box>

            {/* SEARCH INPUT + CAROUSEL */}
            <Box py={5}>
                <Grid container>
                    {/* TRENDING KEYWORDS */}
                    <Grid item sm={4}>
                        <TrendingKeywords></TrendingKeywords>
                    </Grid>
                    {/* PRODUCTS CAROUSEL */}
                    <Grid item sm={8}>
                        <ProductCarousel>
                            {carouselProducts.map(product => (
                                <ProductCardImageOnly key={product.to} product={product} />
                            ))}
                        </ProductCarousel>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </Drawer >
}

export default SearchDrawer