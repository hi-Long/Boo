import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createConcept } from "../../../store/product-action"

const useStyles = makeStyles({
    input: {
        fontSize: "1.5rem"
    }
})

const NewConcept = props => {
    const dispatch = useDispatch()
    const [concept, setConcept] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    const [error, setError] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        if (concept.trim().length === 0) {
            setError(true)
        } else {
            setError(false)
        }
    }, [concept])

    const onNewConceptInput = event => {
        setIsTouched(true)
        setConcept(event.target.value)
    }

    const onNewConceptSubmit = event => {
        event.preventDefault()
        if (!error) {
            dispatch(createConcept(concept))
        }
    }

    return <Box width="100%" mt={3} mb={5} fontSize="32">
        <form onSubmit={event => onNewConceptSubmit(event)}>
            <Grid container spacing={3} alignItems="center">
                <Grid item sm={10}>
                    <TextField
                        className={classes.input}
                        placeholder="Tên mùa"
                        fullWidth
                        value={concept}
                        error={error}
                        helperText={(isTouched && error) && "Không hợp lệ"}
                        InputProps={{ 'type': 'text', 'aria-label': 'description' }}
                        onChange={event => onNewConceptInput(event)} />
                </Grid>
                <Grid item sm={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        fullWidth
                        size="large"
                        type="submit">
                        Tạo concept
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Box>
}

export default NewConcept