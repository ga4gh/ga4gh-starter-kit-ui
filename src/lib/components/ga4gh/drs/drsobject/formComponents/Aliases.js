import React from 'react';
import { 
    Typography,
    FormControl,
    TextField,
    Grid,
    FormGroup,
    Box
} from '@material-ui/core';
import { SpaceDivider } from '../../../../common/layout';
import {
    AddItemButton,
    RemoveItemButton
 } from '../../../../common/form';

/*
    Alias instances can be added or removed using the AddPropertyButton and
    RemovePropertyButton components, and are updated through free-text entry.
*/
const Aliases = props => {
    return (
        <FormGroup>
            <SpaceDivider />
            <Typography align='left' variant='h6'>Aliases</Typography>
            <Typography variant='body2' align='left' color='textSecondary'>
                A list of aliases that can be used to identify the DRS Object
                by additional names.
            </Typography>
            <FormGroup row>
                <Grid container spacing={4} alignItems='center'>
                    {props.aliases.map((alias, index) => {
                        return (
                            <Grid item key={`alias${index}`}>
                                <FormGroup row>
                                    <FormControl>
                                        <TextField
                                            variant='outlined'
                                            id={`alias-${index}`}
                                            margin='normal'
                                            name='alias'
                                            label='Alias'
                                            type='text' 
                                            value={alias}
                                            InputProps={{readOnly: props.readOnly}} 
                                            onChange={e => props.setAlias(index, e.target.value)}
                                        />
                                    </FormControl>
                                    <Box zIndex={1} position='relative' right='10%' top={-10}>
                                        <RemoveItemButton
                                            objectName='alias'
                                            display={!props.readOnly}
                                            disabled={props.readOnly}
                                            handleClick={() => props.removeAlias(index)}
                                        />
                                    </Box>
                                </FormGroup>
                            </Grid>
                        )
                    })}
                    <Grid item>
                        <AddItemButton
                            objectName='alias'
                            display={!props.readOnly}
                            disabled={props.readOnly}
                            handleClick={props.addAlias}
                        />
                    </Grid>
                </Grid>
            </FormGroup>
        </FormGroup>
    )
}

export default Aliases;
