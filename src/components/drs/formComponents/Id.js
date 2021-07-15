import React from 'react';
import { 
    Typography,
    FormControl,
    TextField,
    Grid,
    Button
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

const Id = props => {
    return(
        <Grid container spacing={4} alignItems='center' justify='space-between'>
            <Grid item xs>
                <FormControl fullWidth>
                    <TextField id='id' label='Id' margin='normal' name='id' type='text'
                    value={props.id.id} InputProps={{readOnly: props.readOnlyId}} 
                    onChange={e => props.setId(e.target.value)}
                    helperText='Unique identifier for this DRS Object (UUID recommended), cannot be modified later.'/>
                </FormControl>
            </Grid>
            {/* button to generate id  */}
            {props.readOnlyId
                ? null
                : (
                    <Grid item xs={2} align='right'>
                        <Button variant='contained' color='primary' 
                        onClick={() =>  props.setId(uuidv4())}>
                            <Typography variant='button'>Generate ID</Typography>
                        </Button>
                    </Grid>     
                )
            }
        </Grid>
    );
}

export default Id;