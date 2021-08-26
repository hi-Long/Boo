import { Box, List, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import clsx from "clsx";
import { useSelector } from "react-redux";
import { PRODUCTS_URL } from "../../constants";
import ListItemLink from "../ListItemLink/ListItemLink";

const useStyles = makeStyles({
    root: {
        position: "absolute",
        marginTop: "1rem",
        width: "100%",
        borderRadius: "5px",
        backgroundColor: "white",
        boxShadow: "0px 4px 5px 0px lightslategrey",
        opacity: 0,
        transform: "translateY(-2rem)",
        zIndex: "-1",
        transition: '.2s'
    },
    active: {
        opacity: 1,
        transform: "translateY(0rem)",
        zIndex: 3000
    }
})

const SearchDrawerResults = props => {
    const classes = useStyles(props)
    const { noResults, searchResults } = useSelector(state => state.search)

    return <Box className={clsx(classes.root, { [classes.active]: noResults !== 0 })} width="100%">
        <List>
            {searchResults.subcategories && searchResults.subcategories.map(result =>
                <ListItemLink button key={result} href={`${PRODUCTS_URL}?subcategory=${result}`}>
                    <ListItemIcon>
                        <CategoryOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>{result}</ListItemText>
                </ListItemLink>
            )}
        </List>
    </Box>
}

export default SearchDrawerResults