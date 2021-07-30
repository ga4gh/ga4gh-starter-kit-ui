import React from 'react';
import { Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../../functions/common';
import editButtonStyles from '../../../styles/common/navigation/editButtonStyles';

const EditButton = props => {
    const classes = editButtonStyles();
    return (
        <Button
            className={classes.root}
            variant="outlined"
            onClick={scrollToTop}
            disabled={props.disabled}
            component={Link}
            to={props.to}
        >
            Edit
            <Edit />
        </Button>

    )
}

export default EditButton;
