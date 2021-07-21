import React from 'react';
import { 
    Typography,
    FormGroup,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@material-ui/core';

/*
    Displayed on all forms, but disabled on SHOW and EDIT forms. 
    Editable on NEW form, allowing the user to select between a blob- or
    bundle-type object. Some data entry fields are displayed or hidden,
    depending on the DRS Object type that is selected. The default DRS Object
    type for new DRS Objects is "blob".
*/
const BundleBlobRadio = props => {
    return (
        <FormGroup>
            <Typography align='left' variant='h6'>Is this DRS Object a bundle or a blob?</Typography>
            <Typography variant='body2' align='left' color='textSecondary'>
                Bundles contain references to Child Drs Objects, while Blobs act as single DRS Objects and do not have any children.
            </Typography>
            <RadioGroup name='drs_object_type' value={props.is_bundle} onChange={e => props.setIsBundle(e.target.value === 'true')}>
                <FormControlLabel control={<Radio color='primary'/>} label='Blob' value={false} disabled={props.readOnly}/>
                <FormControlLabel control={<Radio color='primary'/>} label='Bundle' value={true} disabled={props.readOnly}/>
            </RadioGroup>
        </FormGroup>
    )
}

export default BundleBlobRadio