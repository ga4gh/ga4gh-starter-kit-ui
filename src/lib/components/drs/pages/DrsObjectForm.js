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
import FormViewType from '../../../../model/common/FormViewType';

const DrsObjectForm = (props) => {
    const [error, setError] = useState(null);

    const nonEditableOnEditForm = ['id', 'isBundle'];
    const p = {};
    Object.keys(props.groupedFormProps).forEach(key => {
        switch (props.formViewType) {
            case FormViewType.SHOW:
                p[key] = {...props.groupedFormProps[key], readOnly:true};
                break;
            case FormViewType.NEW:
                p[key] = {...props.groupedFormProps[key], readOnly:false};
                break;
            case FormViewType.EDIT:
                // TODO HANDLE EDIT
                break;
        }
    })

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
                    <Button variant='contained' component={Link} to='/drs' color='primary' size='large'>
                        <Typography variant='button'>DRS Index</Typography>
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <Typography align='center' variant="h3" gutterBottom>{props.title}</Typography>
                </Grid>
                <Grid item xs={2} />
            </Grid>
            <Box pb={4}>
                <form>
                    <Id {...p.id} />
                    <Name {...p.name} />
                    <Description {...p.description} />

                    <Grid container justify='space-evenly' spacing={4}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <CreatedTime {...p.createdTime} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <UpdatedTime {...p.updatedTime} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <Version {...p.version} />
                        </Grid>
                    </Grid>

                    <BundleBlobRadio {...p.isBundle} />

                    {p.isBundle.is_bundle
                        ? null
                        :
                            <Grid container justify='flex-start' spacing={4}>
                                <Grid item xs={4}>
                                    <MimeType {...p.mimeType} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Size {...p.size} />
                                </Grid>
                            </Grid>
                    }
                    
                    <Aliases {...p.aliases} />

                    {p.isBundle.is_bundle
                        ? <DrsObjectChildren {...p.children} />
                        : <Checksums {...p.checksums} displayChecksumTypes={props.displayChecksumTypes} />
                    }

                    <DrsObjectParents {...p.parents} />

                    {p.isBundle.is_bundle
                        ? null
                        :
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
                                <FileAccessObjects {...p.fileAccessObjects} />
                                <AwsS3AccessObjects {...p.awsS3AccessObjects} />
                            </FormGroup>
                    }

                    {props.formViewType === FormViewType.NEW
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
