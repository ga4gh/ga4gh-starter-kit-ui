import React from 'react';
import ISO8601DateTimePicker from '../../common/ISO8601DateTimePicker';

const UpdatedTime = props => {
    return (
        <ISO8601DateTimePicker
            id="updated_time"
            label="Updated Time"
            name="updated_time"
            helperText="Timestamp of when the DRS Object was most recently updated in ISO 8601 format."
            value={props.updated_time}
            setFunction={props.setUpdatedTime}
            readOnly={props.readOnlyForm}
         />
    )
}

export default UpdatedTime;