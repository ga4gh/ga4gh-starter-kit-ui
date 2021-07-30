import React, {useState} from 'react';
import { 
    Typography,
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    useHistory
} from 'react-router-dom';
import ApiCaller from '../../../../../utils/ApiCaller';
import { scrollToTop } from '../../../../../functions/common';

const DeleteDrsObjectButton = props => {
    let history = useHistory();
    const [confirmationDialogIsOpen, setConfirmationDialogIsOpen] = useState(false);
    const closeConfirmationDialog = () => {
        setConfirmationDialogIsOpen(false);
    }
    const deleteDrsObject = (id, setSuccessMessage, setError, retrieveDrsObjectsList) => {
        let requestConfig = {
                url: `http://localhost:8080/admin/ga4gh/drs/v1/objects/${id}`,
                method: 'DELETE'
        }
        ApiCaller(
            requestConfig, 
            responseData => {
                setSuccessMessage(`DRS Object '${id}' has been successfully deleted`);
                retrieveDrsObjectsList();
                history.push('/drs');
                scrollToTop();
            }, 
            error => {
                setError(error);
            }
        )
        setConfirmationDialogIsOpen(false);
    }

    return (
        <div>
            <Button variant='contained' color='secondary' size='large' aria-label='delete-drs-object-button'
                endIcon={<DeleteIcon/>} onClick={() => setConfirmationDialogIsOpen(true)}>
                <Typography variant='button'>Delete</Typography>
            </Button> 
            <Dialog open={confirmationDialogIsOpen} onClose={closeConfirmationDialog}>
                <DialogTitle align='center'>Are you sure you want to delete the DRS Object?</DialogTitle>
                <DialogContent>
                    <DialogContentText align='center'>
                        Deleting this DRS Object will permanently remove it from the database.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={closeConfirmationDialog}>
                        <Typography variant='button'>Cancel</Typography>
                    </Button>
                    <Button variant='contained' color='primary' 
                    onClick={event => deleteDrsObject(props.id, props.setSuccessMessage, props.setError, props.retrieveDrsObjectsList)}>
                        <Typography variant='button'>Delete</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteDrsObjectButton;