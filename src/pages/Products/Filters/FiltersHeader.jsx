import { Box, IconButton, makeStyles, Typography } from "@material-ui/core"
import { CloseOutlined } from "@material-ui/icons"

const useStyles = makeStyles({
    root: {
        boxShadow: "0 3px 4px lightgray"
    }
})

const FiltersHeader = props => {
    const classes = useStyles()
    const { onToggleFilters } = props

    return <Box className={classes.root} width="100%" display="flex" alignItems="center" py={2}>
        <Box flexGrow={1}>
            <Typography component="h3" variant="h5" >
                <Box textAlign="center"> FILTER </Box>
            </Typography>
        </Box>
        <IconButton onClick={onToggleFilters}>
            <CloseOutlined />
        </IconButton>
    </Box>
}

export default FiltersHeader