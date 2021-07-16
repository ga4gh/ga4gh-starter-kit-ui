import React from 'react';
import { 
    FormControl,
    TextField
} from '@material-ui/core';

/*
    Size is displayed for blob-type DRS Objects. This field only accepts numbers and can be edited through free-text entry or using 
    the arrow buttons in the text field.
*/
const Size = props => {
    return (
        <FormControl fullWidth>
            <TextField
                id='size'
                label='Size'
                margin='normal'
                name='size'
                type='number'
                helperText='The size (in bytes) of the DRS Object represented as an integer.'
                value={props.size}
                onChange={e => props.setSize(e.target.value)}
                InputProps={{readOnly: props.readOnly}}
            />
        </FormControl>
    )
}

export default Size;