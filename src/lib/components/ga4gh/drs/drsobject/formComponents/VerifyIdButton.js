import React, { useEffect } from 'react';
import { 
    Typography,
    Button,
    IconButton,
    Tooltip
} from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';
import FormViewType from '../../../../../model/common/FormViewType';
import ApiCaller from '../../../../../utils/ApiCaller';

/*
    Used to verify if the ID entered for a parent or child DRS Object is valid.
    When the button is clicked, a GET request for the given ID will be made. If
    an error is returned, the object is set as invalid. If an object is
    successfully returned, it is valid, unless the property to be updated is
    "drs_object_parents" and the DRS Object returned is an existing blob-type
    object. Since blob-type objects cannot have children, they cannot be set as
    parent objects. If the ID has been verified and is valid, it will display a
    blue checkmark icon and the name field will be automatically populated.
    If the ID has been verified and is invalid, a red "X" icon will be displayed
    and the name field will not be populated. If the ID field is empty when the 
    "Verify" button is clicked, the ID will automatically be marked as invalid, 
    without making the GET request.
*/
const VerifyIdButton = props => {

    const defaultHandleValid = responseData => {
        props.setRelativeValid();
        props.setRelativeName(responseData.name);
    }
    const handleValid = props.customApiCallSuccessCallback ? props.customApiCallSuccessCallback : defaultHandleValid;

    const callAndValidate = relative => {
        if (relative.id === '' || relative.id === props.activeDrsObjectId) {
            props.setRelativeInvalid();
        } else {
            let requestConfig = {
                url: `${props.adminURL}/admin/ga4gh/drs/v1/objects/${relative.id}`,
                method: 'GET'
            }
            ApiCaller(requestConfig, handleValid, props.setRelativeInvalid);
        }
    }

    useEffect (() => {
        if(props.formViewType === FormViewType.EDIT && props.relative.id) {
            callAndValidate(props.relative);
        }
    }, [])

    return (
        <div>
            <Button
                aria-label='verify-id'
                color='primary'
                disabled={props.readOnly}
                variant='contained'
                size='small'
                onClick={() => callAndValidate(props.relative)}
            >
                <Tooltip title='Submit this ID for verification.'>
                    <Typography variant='button'>Verify ID</Typography>
                </Tooltip>
            </Button>

            {props.relative.isValid === true
                ?
                    <IconButton color='primary'>
                        <Tooltip title='This is a valid ID.'>
                            <CheckCircle/>
                        </Tooltip>
                    </IconButton>
                : null
            }

            {props.relative.isValid === false
                ?
                    <IconButton color='secondary'>
                        <Tooltip title='This is an invalid ID. Please enter a valid ID before proceeding.'>
                            <Cancel/>
                        </Tooltip>
                    </IconButton>
                : null
            }
        </div>
    )
}

export default VerifyIdButton;
