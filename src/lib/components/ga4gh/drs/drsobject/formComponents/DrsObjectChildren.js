import React from 'react';
import DrsObjectRelatives from './DrsObjectRelatives';
import { 
    Typography
} from '@material-ui/core';

const DrsObjectChildren = props => {
    return (
        <DrsObjectRelatives
            header='Bundle Children'
            sectionDescription={
                <div>
                    <Typography variant='body2' align='left' color='textSecondary'>
                        This DRS Object is currently acting as a DRS Bundle. Bundles
                        contain references to multiple Child objects (single-blob DRS
                        Objects and/or DRS Bundles), enabling multiple DRS Objects to
                        be logically grouped in a nested structure. Only DRS Bundles
                        may have children, single-blob DRS Objects do not have
                        children.
                    </Typography>
                    <Typography variant='body2' align='left' color='textSecondary'>
                        The following listing displays all children for the current
                        DRS Bundle.
                    </Typography>
                </div>
            }
            activeDrsObjectId={props.id}
            relationship="children"
            objectName="child"
            relatives={props.drs_object_children}
            addRelative={props.addChild}
            setRelativeId={props.setChildId}
            setRelativeName={props.setChildName}
            setRelativeValid={props.setChildValid}
            setRelativeInvalid={props.setChildInvalid}
            unsetRelativeValidity={props.unsetChildValidity}
            removeRelative={props.removeChild}
            readOnly={props.readOnly}
            formViewType={props.formViewType}
            adminURL={props.adminURL}
        />
    )
}

export default DrsObjectChildren;
