import React, { useState, useEffect } from 'react';
import { 
    Typography,
    FormControl,
    TextField,
    Grid,
    FormGroup,
    MenuItem
} from '@material-ui/core';
import SpaceDivider from '../../common/SpaceDivider';
import AddItemButton from '../../common/AddItemButton';
import RemoveItemButton from '../../common/RemoveItemButton';

/*
    Displayed for blob-type objects and can be added and removed. The Type
    property is selected using a dropdown, however each type can only be
    selected once. If a type is selected, that option is disabled for each of
    the other checksum instances. A maximum of 3 checksum objects can be added
    before the AddPropertyButton becomes disabled, since there are 3 type
    options. The Checksum value field is updated through free-text entry.
*/
const Checksums = props => {

    const includeChecksumTypeInSelection = (type, index) => {
        let value = props.displayChecksumTypes[type];
        
        if (typeof value === 'boolean') {
            return value;
        }
        
        if (typeof value === 'number') {
            return index <= value;
        }

        return false;
    }

    return (
        <FormGroup>
            <SpaceDivider />
            <Typography align='left' variant='h6'>Checksums</Typography>
            <Typography variant='body2' align='left' color='textSecondary'>
                Each single-blob DRS Object must report one or more checksums,
                recording the digest algorithm and value of the DRS Object
                bytes.
                The following list displays the recorded digest algorithms
                and corresponding values for this DRS Object.
            </Typography>
            <br />
            {props.checksums.map((checksum, index) => {
                return (
                    <FormGroup key={`checksum${index}`} row>
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField 
                                        select
                                        variant='outlined'
                                        id={`ChecksumType${index}`}
                                        label='Type'
                                        name='type'
                                        type='text'
                                        align='left'
                                        helperText='Hashing algorithm used to generate the checksum.' 
                                        value={checksum.type}
                                        onChange={e => props.setChecksumType(index, e.target.value)}
                                        InputProps={{readOnly: props.readOnly}}
                                    >
                                        {includeChecksumTypeInSelection('md5', index)
                                            ?
                                                <MenuItem id='md5' value='md5'>md5</MenuItem>
                                            : null
                                        }

                                        {includeChecksumTypeInSelection('sha1', index)
                                            ?
                                                <MenuItem id='sha1' value='sha1'>sha1</MenuItem>
                                            : null
                                        }

                                        {includeChecksumTypeInSelection('sha256', index)
                                            ?
                                                <MenuItem id='sha256' value='sha256'>sha256</MenuItem>
                                            : null
                                        }
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl fullWidth>
                                    <TextField
                                        variant='outlined'
                                        id={`ChecksumValue${index}`}
                                        label='Checksum'
                                        name='checksum'
                                        type='checksum'
                                        helperText='Checksum digest value.'
                                        value={checksum.checksum}
                                        onChange={e => props.setChecksumChecksum(index, e.target.value)}
                                        InputProps={{readOnly: props.readOnly}}
                                    />
                                </FormControl>
                            </Grid>
                            <RemoveItemButton
                                objectName='checksum'
                                display={!props.readOnly}
                                disabled={props.readOnly}
                                handleClick={() => props.removeChecksum(index)}
                            />
                        </Grid>
                    </FormGroup>
                )
            })} 
            <AddItemButton
                objectName='checksum'
                display={props.checksums.length < 3}
                disabled={!(props.checksums.length < 3)}
                handleClick={props.addChecksum}
            />
        </FormGroup>
    )
}

export default Checksums;
