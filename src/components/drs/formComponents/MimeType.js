import React from 'react';
import { 
    FormControl,
    TextField
} from '@material-ui/core';

const MimeType = props => {
    return (
        <FormControl fullWidth>
            <TextField
                id='mime_type'
                label='MIME Type'
                margin='normal'
                name='mime_type'
                type='text'
                helperText='The media type of the DRS Object' 
                value={props.mimeType}
                onChange={(e) => props.setMimeType(e.target.value)}
                InputProps={{readOnly: props.readOnly}}
            />
        </FormControl>    
    )
}

export default MimeType;