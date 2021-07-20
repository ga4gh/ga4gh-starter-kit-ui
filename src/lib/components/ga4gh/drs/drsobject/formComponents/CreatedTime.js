import React from 'react';
import ISO8601DateTimePicker from '../../../../common/ISO8601DateTimePicker';

const CreatedTime = props => {
    return (
        <ISO8601DateTimePicker
            id="created_time"
            label="Created Time"
            name="created_time"
            helperText="Timestamp of DRS Object creation in ISO 8601 format."
            value={props.created_time}
            setFunction={props.setCreatedTime}
            readOnly={props.readOnly}
         />
    )
}

export default CreatedTime;