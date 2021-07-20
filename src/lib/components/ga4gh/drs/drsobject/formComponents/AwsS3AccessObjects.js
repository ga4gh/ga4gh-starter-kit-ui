import React from 'react';
import {
    FormControl,
    FormGroup,
    TextField,
    Typography,
    Grid
} from '@material-ui/core';
import {
    AddItemButton,
    RemoveItemButton
 } from '../../../../common/form';

const AwsS3AccessObjects = props => {
    return (
        <FormGroup>
            <br /> 
            <Typography align='left' variant='body1'>AWS S3 Access Points</Typography>
            <Typography variant='body2' align='left' color='textSecondary'>
                Represents objects stored in AWS S3 containing DRS Object bytes.
            </Typography>
            {props.aws_s3_access_objects.map((awsS3AccessObject, index) => {
                return (
                    <FormGroup key={`AwsS3AccessObject-${index}`} row>
                        <Grid container alignItems='center' spacing={4}>
                            <Grid item xs>
                                <FormControl fullWidth>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id={`AwsS3AccessObject-region-${index}`} 
                                        label='Region'
                                        margin='normal'
                                        name='region'
                                        type='text' 
                                        value={awsS3AccessObject.region}
                                        InputProps={{readOnly: props.readOnly}} 
                                        helperText='Region where AWS S3 bucket is located.' 
                                        onChange={e => props.setAwsS3AccessObjectRegion(index, e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs> 
                                <FormControl fullWidth>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id={`AwsS3AccessObject-bucket-${index}`}
                                        label='Bucket'
                                        margin='normal'
                                        name='bucket'
                                        type='text'
                                        value={awsS3AccessObject.bucket}
                                        InputProps={{readOnly: props.readOnly}}
                                        helperText='AWS S3 bucket containing the DRS Object.'
                                        onChange={e => props.setAwsS3AccessObjectBucket(index, e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <TextField
                                        variant='outlined'
                                        fullWidth
                                        id={`AwsS3AccessObject-key-${index}`}
                                        label='Key'
                                        margin='normal'
                                        name='key'
                                        type='text'
                                        value={awsS3AccessObject.key}
                                        InputProps={{readOnly: props.readOnly}}
                                        helperText='Path within the bucket to the S3 object storing DRS Object bytes.'
                                        onChange={e => props.setAwsS3AccessObjectKey(index, e.target.value)}/>                            
                                </FormControl>
                            </Grid>
                            <RemoveItemButton
                                display={!props.readOnly}
                                objectName='AWS S3 access point'
                                handleClick={() => props.removeAwsS3AccessObject(index)}
                            />
                        </Grid>
                    </FormGroup>
                )
            })}
            <AddItemButton
                objectName='AWS S3 access point'
                display={!props.readOnly}
                disabled={props.readOnly}
                handleClick={props.addAwsS3AccessObject}
            />
        </FormGroup>
    )
}

export default AwsS3AccessObjects;
