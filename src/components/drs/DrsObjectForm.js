import '@fontsource/roboto';
import React from 'react';
import { 
    Typography, 
    Container, 
    FormControl,
    TextField, 
    Input, 
    Grid
} from '@material-ui/core';

const RelatedDrsObjects = () => {
    return (
        <Typography>Related Drs Objects</Typography>
    );
}

const AdditionalProperties = () => {

}

const DrsObject = (props) => {
    let drsObjectDetails = props.drsObjectDetails;
    let readOnlyValue = props.readOnly;
    console.log(typeof readOnlyValue);
    return (
        <div align="center">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <Container maxWidth='lg'>
          <form>
              <FormControl fullWidth>
                  <TextField id='id' label='id' margin='normal' name='id' type='text' value={drsObjectDetails.id} InputProps={{readOnly: readOnlyValue}}></TextField>
              </FormControl>
              <FormControl fullWidth>
                  <TextField id='name' label='name' margin='normal' name='name' type='text' value={drsObjectDetails.name} InputProps={{readOnly: readOnlyValue}}></TextField>
              </FormControl>
              <FormControl fullWidth>
                  <TextField id='description' label='description' margin='normal' name='description' type='text' value={drsObjectDetails.description} InputProps={{readOnly: readOnlyValue}}></TextField>
              </FormControl>
              <Grid container justify='space-evenly' spacing={4}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='created_time' label='created_time' margin='normal' name='created_time' type='text' value={drsObjectDetails.created_time} InputProps={{readOnly: readOnlyValue}}></TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='updated_time' label='updated_time' margin='normal' name='updated_time' type='text' value={drsObjectDetails.updated_time} InputProps={{readOnly: readOnlyValue}}></TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField id='version' label='version' margin='normal' name='version' type='text' value={drsObjectDetails.version} InputProps={{readOnly: readOnlyValue}}></TextField>
                    </FormControl>
                </Grid>
              </Grid>
              <RelatedDrsObjects children={drsObjectDetails.drs_object_children} />
              <RelatedDrsObjects parents={drsObjectDetails.drs_object_parents} />
          </form>
      </Container>
      </div>
    );
}

export default DrsObject;