import React from 'react';
import { SimpleTextField } from '../../../../common/form';

const Name = props => {
    return (
        <SimpleTextField
            id="name"
            label="Name"
            name="name"
            value={props.name}
            readOnly={props.readOnly}
            changeFunction={props.setName}
            helperText='Short, descriptive name for this DRS Object.'
        />
    )
}

export default Name;