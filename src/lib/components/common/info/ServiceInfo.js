import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    Tooltip,
    TableRow,
    Typography
} from '@material-ui/core';
import {
    Help
} from '@material-ui/icons';
import serviceInfoStyles from '../../../styles/common/info/serviceInfoStyles';
import { capitalize, startCase } from 'lodash';

const ServiceInfoProp = (key, value) => {
    return (
        <TableRow>
            <TableCell>{key}:</TableCell>
            <TableCell>{value}</TableCell>
        </TableRow>
    )
}

const ServiceInfo = props => {
    const classes = serviceInfoStyles();
    const simplePropsA = [
        'id',
        'name',
        'description'
    ];
    const simplePropsB = [
        'contactUrl',
        'documentationUrl',
        'environment',
        'version'
    ]

    // type, org name, org url
    return (
        <div>
            <Typography className={classes.subheading}>Basic Info</Typography>
            <Table size="small">
                <TableBody>
                    {simplePropsA.map(property => ServiceInfoProp(startCase(property), props[property]))}
                    {ServiceInfoProp('Created At', new Date(Date.parse(props.createdAt)).toString())}
                    {ServiceInfoProp('Updated At', new Date(Date.parse(props.updatedAt)).toString())}
                    {simplePropsB.map(property => ServiceInfoProp(startCase(property), props[property]))}
                </TableBody>
            </Table>
            <Typography className={classes.subheading}>
                GA4GH Specification Info
                {`   `}
                <Tooltip title='Information about GA4GH API specification that the web service implements'>
                    <Help color='primary' fontSize='small' />
                </Tooltip>
            </Typography>
            <Table size="small">
                <TableBody>
                    {ServiceInfoProp('Group', props.type.group)}
                    {ServiceInfoProp('Artifact', props.type.artifact)}
                    {ServiceInfoProp('Name', props.apiType.name)}
                    {props.apiType.abbreviation
                        ? ServiceInfoProp('Abbreviation', props.apiType.abbreviation)
                        : null
                    }
                    {ServiceInfoProp('Version', props.type.version)}
                </TableBody>
            </Table>
            <Typography className={classes.subheading}>
                Organization Info
                {`   `}
                <Tooltip title='Information about the organization hosting the web service'>
                    <Help color='primary' fontSize='small' />
                </Tooltip>
            </Typography>
            
            <Table size="small">
                <TableBody>
                    {ServiceInfoProp('Name', props.organization.name)}
                    {ServiceInfoProp('URL', props.organization.url)}
                </TableBody>
            </Table>
        </div>
    )
}

export default ServiceInfo;