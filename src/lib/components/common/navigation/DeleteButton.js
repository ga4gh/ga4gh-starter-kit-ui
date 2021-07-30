import React from 'react';
import { Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import deleteButtonStyles from '../../../styles/common/navigation/deleteButtonStyles';

const DeleteButton = props => {
    const classes = deleteButtonStyles();
    return (
        <Button
            className={classes.root}
            variant="outlined"
            onClick={() => alert('deleting...')}
        >
            Delete
            <Delete />
        </Button>

    )
}

export default DeleteButton;
