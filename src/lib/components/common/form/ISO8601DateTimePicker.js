import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { 
    FormControl
} from '@material-ui/core';
import { 
    DateTimePicker,
    MuiPickersUtilsProvider 
} from '@material-ui/pickers';
import { dateToISOString } from '../../../functions/common';

/*
    Displays a text field that opens a date-time picker when selected. The date
    and time are entered and displayed in the local time using the 24 hour
    clock, however, the activeDrsObject is updated with the date and time
    converted to UTC time. Seconds cannot be selected, and therefore they are
    always automatically set to zero. The date and time are displayed in the
    format 'yyyy-MM-dd HH:mm:ss OOOO' which includes the timezone (offset from
    GMT). The date-time picker includes a "Today" button which sets the value
    to the current minute when clicked.
*/
const ISO8601DateTimePicker = props => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormControl fullWidth>
                <DateTimePicker
                    margin="normal"
                    format="yyyy-MM-dd HH:mm:ss OOOO"
                    id={props.id}
                    label={props.label}
                    name={props.name}
                    value={props.value} 
                    readOnly={props.readOnly}
                    showTodayButton
                    ampm={false}
                    helperText={props.helperText}
                    onChange={date => props.setFunction(dateToISOString(date))}
                />
            </FormControl>
        </MuiPickersUtilsProvider>
    )
}

export default ISO8601DateTimePicker;