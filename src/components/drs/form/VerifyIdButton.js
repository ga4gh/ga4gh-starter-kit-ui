import React from 'react';
import { 
    Typography,
    Button,
    IconButton,
    Tooltip
} from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Cancel from '@material-ui/icons/Cancel';

const VerifyIdButton = props => {

    const validateRelative = () => {

    }

    const callAndValidate = () => props.retrieveDrsObject(props.relative.id, validateRelative);

    return (
        <div>
            <Button
                color='primary'
                disabled={props.readOnly}
                variant='contained'
                size='small'
                onClick={callAndValidate}
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
