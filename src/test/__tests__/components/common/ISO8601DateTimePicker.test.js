import React from 'react';
import renderer from 'react-test-renderer';
import ISO8601DateTimePicker from '../../../../lib/components/common/ISO8601DateTimePicker';

//will need to use mock functions to test different timezones, morning, evening, current time, etc.
test('SHOW <ISO8601DateTimePicker /> should handle any date and time', () => {
    const iso8601DateTimePicker = renderer.create(<ISO8601DateTimePicker 
        readOnly={true}
        value='2021-07-22T13:00:00Z'
        propertyName='Date-Time Snapshot Test'
        label='Date-Time Snapshot Test'
        description='This is a date-time field description for a snapshot test.' />)
    .toJSON();
    //expect(iso8601DateTimePicker).toMatchSnapshot();
})

test('NEW and EDIT <ISO8601DateTimePicker /> should handle any date and time', () => {
    const iso8601DateTimePicker = renderer.create(<ISO8601DateTimePicker 
        readOnly={false}
        value='2021-07-22T13:00:00Z'
        propertyName='Date-Time Snapshot Test'
        label='Date-Time Snapshot Test'
        description='This is a date-time field description for a snapshot test.' />)
    .toJSON();
    //expect(iso8601DateTimePicker).toMatchSnapshot();
})