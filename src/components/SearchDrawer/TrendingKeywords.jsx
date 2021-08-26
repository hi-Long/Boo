import { List, ListItemText, makeStyles, Typography } from "@material-ui/core"
import { Fragment } from "react"
import { PRODUCTS_URL } from "../../constants"
import ListItemLink from "../ListItemLink/ListItemLink"

const trendingSearchTexts = ["Áo phông", "Quần dài", "Áo sơ mi"]

const useStyles = makeStyles({
    root: {
        paddingInline: 0,
        transition: ".3s",
        "&:hover": {
            paddingLeft: "1rem"
        }
    }
})

const TrendingKeywords = props => {
    const classes = useStyles()

    return <Fragment>
        <Typography variant="button" component="h3">TRENDING</Typography>
        <List>
            {trendingSearchTexts.map(text => (
                <ListItemLink
                    className={classes.root} key={text}
                    button href={`${PRODUCTS_URL}?subcategory=${text}`}>
                    <ListItemText variant="caption" component="span">{text}</ListItemText>
                </ListItemLink>
            ))}
        </List>
    </Fragment>
}

export default TrendingKeywords