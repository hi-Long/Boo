import { TextField } from "@material-ui/core"

const InputNumber = props => {
    return <TextField
        id="standard-number"
        label="Number"
        type="number"
        InputLabelProps={{
            shrink: true,
        }}
    />
}

export default InputNumber