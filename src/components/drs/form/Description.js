import React from 'react';
import SimpleTextField from '../../common/SimpleTextField';

const Description = props => {
    return (
        <SimpleTextField
            id="description"
            label="Description"
            name="description"
            value={props.description}
            readOnly={props.readOnlyForm}
            changeFunction={props.setDescription}
            helperText='Longer description of this DRS Object.'
        />
    )
}

export default Description;