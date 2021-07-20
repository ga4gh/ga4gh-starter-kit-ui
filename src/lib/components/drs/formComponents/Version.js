import React from 'react';
import SimpleTextField from '../../common/SimpleTextField';

const Version = props => {
    return (
        <SimpleTextField
            id="version"
            label="Version"
            name="version"
            value={props.version}
            readOnly={props.readOnly}
            changeFunction={props.setVersion}
            helperText='Current version of the DRS Object, it should be updated each time the DRS Object is modified.'
        />
    )
}

export default Version;