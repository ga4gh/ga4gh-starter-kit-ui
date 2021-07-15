import React from 'react';
import { 
    Container,
    Typography, 
    FormControl,
    TextField, 
    Grid, 
    FormGroup, 
    Button, 
    Divider, 
    Box, 
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    IconButton, 
    MenuItem, 
    Tooltip,
    InputAdornment
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';

/*
    Displays a "+" icon and can be used to add additional fields for list-type
    items. It is passed a handler function as a prop, which should append
    another instance of the item to the list of items being updated.
*/
const AddItemButton = props => {
    return (
        <div>
            {props.display
                ?
                    <Grid container>
                        <Grid item>
                            <Tooltip title={`Add ${props.objectName}`}>
                                <IconButton color='primary' onClick={props.handleClick} disabled={props.disabled}>
                                    <AddCircle/>
                                </IconButton>   
                            </Tooltip>    
                        </Grid>
                    </Grid>
                : null
            }
        </div>
    )
}

export default AddItemButton;