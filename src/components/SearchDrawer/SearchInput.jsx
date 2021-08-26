import { InputAdornment, makeStyles, TextField } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
        width: "100%",
        "& #search-drawer-input": {
            fontSize: "2rem"
        }
    }
})

const SearchDrawerInput = props => {
    const classes = useStyles()
    const { setSearchText, setTouch } = props

    return <TextField
        className={classes.root}
        id="search-drawer-input"
        placeholder="Tìm kiếm"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon fontSize="large"></SearchIcon>
                </InputAdornment>
            )
        }}
        width="100%"
        size="medium"
        color="secondary"
        onClick={() => setTouch(true)}
        onChange={event => setSearchText(event.target.value)}
    />
}

export default SearchDrawerInput