import React from 'react';
import { 
    Container,
    Typography, 
    FormControl,
    TextField, 
    Grid, 
    FormGroup, 
    Button, 
    Divider, 
    Box, 
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    IconButton, 
    MenuItem, 
    Tooltip,
    InputAdornment
} from '@material-ui/core';
import SpaceDivider from '../../common/SpaceDivider';
import RemoveItemButton from '../../common/RemoveItemButton';
import VerifyIdButton from './VerifyIdButton';
import AddItemButton from '../../common/AddItemButton';

const DrsObjectRelatives = props => {
    return (
        <FormGroup>
            <SpaceDivider />
            <Typography align='left' variant='h6'>{props.header}</Typography>
            {props.sectionDescription}
            {props.relatives.map((relative, index) => {
                return (
                    <FormGroup key={`props.relationship-${index}`} row>
                        <Grid container alignItems='center' spacing={4}>
                            <Grid item xs> 
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        id={`ID_${props.relationship}${index}`} 
                                        label='Id' name={relative.id} value={relative.id} margin='normal' type='text' 
                                        onChange={e => {
                                            props.setRelativeId(index, e.target.value);
                                            props.unsetRelativeValidity(index);
                                        }}
                                        InputProps={
                                            {
                                                readOnly: props.readOnly,
                                                endAdornment: 
                                                    <InputAdornment position='end'>
                                                        <VerifyIdButton 
                                                            activeDrsObject={props.activeDrsObject}
                                                            relative={relative}
                                                            retrieveDrsObject={props.retrieveDrsObject}
                                                            readOnly={props.readOnly}
                                                            //drsObjectFunctions={props.drsObjectFunctions} 
                                                            //index={index} 
                                                            //property={props.relationship}
                                                        />
                                                    </InputAdornment>
                                            }
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl fullWidth>
                                    <TextField variant='outlined' fullWidth id={`Name_${props.relationship}${index}`} 
                                    label='Name' margin='normal' name={relative.name} type='text' 
                                    value={relative.name} InputProps={{readOnly: true}}/>                            
                                </FormControl>
                            </Grid>

                            <RemoveItemButton
                                display={!props.readOnly}
                                objectName={props.objectName}
                                handleClick={() => props.removeRelative(index)}
                            />
                        </Grid>
                    </FormGroup>
                )
            })}
            <AddItemButton
                objectName={props.objectName}
                display={!props.readOnly}
                disabled={props.readOnly}
                handleClick={props.addRelative}
            />
        </FormGroup>
    )
}

export default DrsObjectRelatives;
