import React from 'react';
import { 
    Typography,
    FormControl,
    TextField,
    Grid,
    Button
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

const SimpleTextField = props => {
    return(
        <FormControl fullWidth>
            <TextField
                id={props.id}
                label={props.label}
                margin='normal'
                name={props.name}
                type='text' 
                value={props.value}
                InputProps={{readOnly: props.readOnly}}
                onChange={e => props.changeFunction(e.target.value)}
                helperText={props.helperText}/>
        </FormControl>
    );
}

export default SimpleTextField;