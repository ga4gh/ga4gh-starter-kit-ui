import React, { useState } from 'react';
import {
    Typography,
    FormControl,
    Grid,
    FormGroup,
    Box,
    Snackbar,
    Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import {
    Link
} from 'react-router-dom';
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
import {
    PageContainer,
    SpaceDivider
} from '../../../../common/layout';
import FormViewType from '../../../../../model/common/FormViewType';
import {
    BackButton,
    BreadcrumbTrail,
    DeleteButton,
    EditButton,
    ViewButton
} from '../../../../common/navigation';
import { scrollToTop } from '../../../../../functions/common';

const DrsObjectForm = (props) => {
    const [error, setError] = useState(null);

    const applyReadOnly = () => {
        let nonEditableOnEditForm = new Set(['id', 'isBundle']);
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
                    nonEditableOnEditForm.has(key) 
                    ? p[key] = {...props.groupedFormProps[key], readOnly: true}
                    : p[key] = {...props.groupedFormProps[key], readOnly:false};
                    break;
            }
        })
        return p;
    }

    const p = applyReadOnly();

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

    const appendFormToTrail = (trail, id) => {
        let newTrail = [...trail];
        switch (props.formViewType) {
            case FormViewType.SHOW:
                newTrail.push({to: '#', label: id});
                break;
            case FormViewType.NEW:
                newTrail.push({to: '#', label: 'new'});
                break;
            case FormViewType.EDIT:
                newTrail.push({to: '#', label: id});
                newTrail.push({to: '#', label: 'edit'});
        }
        return newTrail;
    }

    const trail = appendFormToTrail(props.trail, p.id.id);

    return (
        <PageContainer>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                open={error}
                onClose={() => setError(null)}
            >
                <Alert onClose={() => setError(null)} severity="error" variant="filled">
                    {error ? `Error: ${error.message}` : null }
                </Alert>
            </Snackbar>

            <BreadcrumbTrail trail={trail} />
            <BackButton to="../objects" />

            <Typography align='left' variant="h5" gutterBottom>{props.title}</Typography>

            {/* View, Edit, and Delete buttons */}
            {props.formViewType !== FormViewType.NEW
            ?
                <div>
                    <ViewButton
                        disabled={props.formViewType === FormViewType.SHOW}
                        to={`${props.baseURL}/${p.id.id}`}
                    />
                    <EditButton
                        disabled={props.formViewType === FormViewType.EDIT}
                        to={`${props.baseURL}/${p.id.id}/edit`}
                    />
                    <DeleteButton
                        {...p.delete}
                        entityName="DRS Object"
                    />
                </div>
            : null
            }

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
                                ? <DrsObjectChildren {...p.children} formViewType={props.formViewType} />
                                : null 
                        :
                            vis(p.checksums.checksums)
                                ? <Checksums {...p.checksums} />
                                : null
                    }

                    {vis(p.parents.drs_object_parents)
                        ? <DrsObjectParents {...p.parents} formViewType={props.formViewType} />
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
        </PageContainer>
    );
}

export default DrsObjectForm;
