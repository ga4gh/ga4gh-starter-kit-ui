import React from 'react';
import {
    FormControl,
    FormGroup,
    TextField,
    Typography,
    Grid
} from '@material-ui/core';
import AddItemButton from '../../common/AddItemButton';
import RemoveItemButton from '../../common/RemoveItemButton';

const FileAccessObjects = props => {
    return (
        <FormGroup>
            <br /> 
            <Typography align='left' variant='body1'>Local File Access Points</Typography>
            <Typography variant='body2' align='left' color='textSecondary'>
                Local file access points represent local files available on
                the same filesystem where the DRS service is running. This
                can also include files co-located on Network Attached Storage
                (NAS), such as on a high-performance compute cluster (HPC).                    
            </Typography>
            {props.file_access_objects.map((fileAccessObject, index) => {
                return (
                    <Grid
                        container
                        alignItems='center'
                        spacing={4}
                        key={`FileAccessObject-${index}`}
                    >
                        <Grid item xs>
                            <FormControl fullWidth>
                                <TextField
                                    variant='outlined'
                                    id={`FileAccessObject-path-${index}`} 
                                    label='Path'
                                    margin='normal'
                                    name='path'
                                    type='text' 
                                    value={fileAccessObject.path}
                                    InputProps={{readOnly: props.readOnly}}
                                    helperText='The filesystem path to the local file storing DRS Object bytes'
                                    onChange={e => props.setFileAccessObjectPath(index, e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <RemoveItemButton
                            display={!props.readOnly}
                            objectName='local file access point'
                            handleClick={() => props.removeFileAccessObject(index)}
                        />
                    </Grid>
                )
            })}
            <AddItemButton
                objectName='local file access point'
                display={!props.readOnly}
                disabled={props.readOnly}
                handleClick={props.addFileAccessObject}
            />
        </FormGroup>
    )
}

export default FileAccessObjects;
