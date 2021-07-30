import React from 'react';
import { 
    Grid,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

/*
    Displays a "-" icon and can be used to remove instances of list-type items.
    It is passed a handler function as a prop, which should remove the specified
    instance from the list of items being updated. It is also passed an index
    value as a prop, which should be used to identify the specific object
    instance to be removed.
*/
const RemoveItemButton = (props) => {
    return (
        <div>
            {props.display
                ?
                    <Grid item xs={1}>
                        <Tooltip title={`Remove this ${props.objectName}.`} data-testid='remove-item-button-tooltip'>
                            <IconButton aria-label={`remove-item-button`} color='secondary' onClick={props.handleClick}>
                                <RemoveCircle/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                : null
            }
        </div>
    )
}

export default RemoveItemButton;
