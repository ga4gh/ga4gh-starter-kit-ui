import React, { useState } from 'react';
import '@fontsource/roboto';
import {
    Container,
    Typography,
    FormControl,
    Grid,
    FormGroup,
    Button,
    Box,
    Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import {
    Link
} from "react-router-dom";
import {
    Aliases,
    AwsS3AccessObjects,
    BundleBlobRadio,
    Checksums,
    CreatedTime,
    Description,
    DrsObjectChildren,
    DrsObjectParents,
    FileAccessObjects,
    Id,
    MimeType,
    Name,
    Size,
    SubmitButton,
    UpdatedTime,
    Version
} from '../formComponents';
import SpaceDivider from '../../common/SpaceDivider';
import FormViewType from '../../../model/common/FormViewType';
import { scrollToTop } from '../../../functions/common';
import DeleteDrsObjectButton from '../formComponents/DeleteDrsObjectButton';

const DrsObjectForm = (props) => {
    const [error, setError] = useState(null);

    const applyReadOnly = () => {
        let nonEditableOnEditForm = ['id', 'isBundle'];
        let p = {};
        Object.keys(props.groupedFormProps).forEach(key => {
            switch (props.formViewType) {
                case FormViewType.SHOW:
                    p[key] = {...props.groupedFormProps[key], readOnly:true};
                    break;
                case FormViewType.NEW:
                    p[key] = {...props.groupedFormProps[key], readOnly:false};
                    break;
                case FormViewType.EDIT:
                    nonEditableOnEditForm.some(element => element === key)
                    ? p[key] = {...props.groupedFormProps[key], readOnly: true}
                    : p[key] = {...props.groupedFormProps[key], readOnly:false};
                    break;
            }
        })
        return p;
    }

    // visualize an editable component if on NEW or EDIT page
    // visualize only VIEW page ONLY if the property is non-null/non-empty
    const vis = value => {
        if (props.formViewType === FormViewType.NEW || props.formViewType === FormViewType.EDIT) {
            return true;
        }

        switch (typeof value) {
            case 'string':
                return value !== '';
                break;
            case 'number':
                return true;
                break;
            case 'object':
                if (value instanceof Array) {
                    return value.length > 0;
                }
        }
        return false;
    }

    const p = applyReadOnly();

    return (
      <div>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Container maxWidth='lg'>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                open={error}
                onClose={() => setError(null)}
            >
                <Alert onClose={() => setError(null)} severity="error" variant="filled">
                    {error ? `Error: ${error.message}` : null }
                </Alert>
            </Snackbar>

            <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={2} align='left'>
                    {
                        props.formViewType === FormViewType.EDIT 
                        ?   <DeleteDrsObjectButton {...p.delete} setError={setError}/>
                        :   <Button variant='contained' color='primary' size='large'
                            component={Link} to='/drs' onClick={scrollToTop}>
                                <Typography variant='button'>DRS Index</Typography>
                            </Button>
                    }
                </Grid>
                <Grid item xs={8}>
                    <Typography align='center' variant="h3" gutterBottom>{props.title}</Typography>
                </Grid>
                <Grid item xs={2} align='right'>
                    {
                        props.formViewType === FormViewType.SHOW 
                        ?   <Button variant='contained' color='primary' size='large' endIcon={<EditIcon/>}
                            component={Link} to={`/drs/${p.edit.id}/edit`} onClick={scrollToTop}>
                                <Typography variant='button'>Edit</Typography>
                            </Button> 
                        : props.formViewType === FormViewType.EDIT 
                        ?   <Button variant='contained' color='primary' size='large'
                            component={Link} to={`/drs/${p.cancel.id}`} onClick={scrollToTop}>
                                <Typography variant='button'>Cancel</Typography>
                            </Button>  
                        : null
                    }
                </Grid>
            </Grid>
            <Box pb={4}>
                <form>
                    {vis(p.id.id) ? <Id {...p.id} /> : null}
                    {vis(p.name.name) ? <Name {...p.name} /> : null}
                    {vis(p.description.description) ? <Description {...p.description} /> : null }
                    <Grid container justify='flex-start' spacing={4}>
                        {vis(p.createdTime.created_time)
                            ?
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <CreatedTime {...p.createdTime} />
                                    </FormControl>
                                </Grid>
                            : null
                        }
                        {vis(p.updatedTime.updated_time)
                            ?
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <UpdatedTime {...p.updatedTime} />
                                    </FormControl>
                                </Grid>
                            : null
                        }
                        {vis(p.version.version)
                            ?
                                <Grid item xs={4}>
                                    <Version {...p.version} />
                                </Grid>
                            : null
                        }
                    </Grid>
                    <BundleBlobRadio {...p.isBundle} />
                    {p.isBundle.is_bundle
                        ? null
                        :
                            <Grid container justify='flex-start' spacing={4}>
                                {vis(p.mimeType.mime_type)
                                    ? 
                                        <Grid item xs={4}>
                                            <MimeType {...p.mimeType} />
                                        </Grid>
                                    : null
                                }
                                {vis(p.size.size)
                                    ?
                                        <Grid item xs={4}>
                                            <Size {...p.size} />
                                        </Grid>
                                    : null
                                }
                            </Grid>
                    }
                    
                    {vis(p.aliases.aliases) ? <Aliases {...p.aliases} /> : null}

                    {p.isBundle.is_bundle
                        ?
                            vis(p.children.drs_object_children)
                                ? <DrsObjectChildren {...p.children} />
                                : null 
                        :
                            vis(p.checksums.checksums)
                                ? <Checksums {...p.checksums} />
                                : null
                    }

                    {vis(p.parents.drs_object_parents)
                        ? <DrsObjectParents {...p.parents} />
                        : null
                    }

                    {p.isBundle.is_bundle
                        ? null
                        :
                            (vis(p.fileAccessObjects.file_access_objects) || vis(p.awsS3AccessObjects.aws_s3_access_objects))
                                ?
                                    <FormGroup>
                                        <SpaceDivider />
                                        <Typography align='left' variant='h6'>Access Points</Typography>
                                        <Typography variant='body2' align='left' color='textSecondary'>
                                            A DRS Object may contain multiple access points for fetching 
                                            the raw bytes. Multiple access points give the client options 
                                            in choosing the best data source for their use case (e.g.
                                            based on geographic proximity to the data). All access points
                                            associated with a single DRS Object must have the same bytes.
                                        </Typography>

                                        {vis(p.fileAccessObjects.file_access_objects)
                                            ? <FileAccessObjects {...p.fileAccessObjects} />
                                            : null
                                        }

                                        {vis(p.awsS3AccessObjects.aws_s3_access_objects)
                                            ? <AwsS3AccessObjects {...p.awsS3AccessObjects} />
                                            : null
                                        }
                                    </FormGroup>
                                : null
                            
                    }

                    {props.formViewType === FormViewType.NEW || props.formViewType === FormViewType.EDIT
                        ? <SubmitButton {...p.submit} formViewType={props.formViewType} setError={setError} />
                        : null
                    }
                </form>
            </Box>
        </Container>
      </div>
    );
}

export default DrsObjectForm;
