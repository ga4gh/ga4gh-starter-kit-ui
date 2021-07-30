import React, { useState } from 'react';
import {
    Typography,
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import ApiCaller from '../../../utils/ApiCaller';
import { scrollToTop } from '../../../functions/common';
import deleteButtonStyles from '../../../styles/common/navigation/deleteButtonStyles';

const DeleteButton = props => {
    let history = useHistory();
    const [confirmationDialogIsOpen, setConfirmationDialogIsOpen] = useState(false);
    const closeConfirmationDialog = () => setConfirmationDialogIsOpen(false);
    const deleteEntity = () => {
        let requestConfig = {url: props.deleteURL, method: 'DELETE'}
        ApiCaller(
            requestConfig,
            responseData => {
                props.setSuccessMessageFunc(`${props.entityName} '${props.id}' has been successfully deleted`);
                props.updateDataFunc()
                history.push(props.redirect);
                scrollToTop();
            },
            error => {
                props.setErrorFunc(error);
            }
        )
        setConfirmationDialogIsOpen(false);
    }

    const classes = deleteButtonStyles();
    return (
        <div className={classes.div}>
            <Button
                className={classes.root}
                variant="outlined"
                onClick={() => setConfirmationDialogIsOpen(true)}
            >
                Delete
                <Delete />
            </Button>
            <Dialog open={confirmationDialogIsOpen} onClose={closeConfirmationDialog}>
                <DialogTitle align='center'>
                    {`Are you sure you want to delete this ${props.entityName}`}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText align='center'>
                        {`Deleting this ${props.entityName} will permanently remove it from the database.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={closeConfirmationDialog}>
                        <Typography variant='button'>Cancel</Typography>
                    </Button>
                    <Button variant='contained' color='primary' 
                    onClick={e => deleteEntity() }>
                        <Typography variant='button'>Delete</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteButton;
