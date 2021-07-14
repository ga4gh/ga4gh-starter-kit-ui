import React from 'react';
import DrsObjectRelatives from './DrsObjectRelatives';
import { 
    Typography
} from '@material-ui/core';

const DrsObjectParents = props => {
    return (
        <DrsObjectRelatives
            header='Parent Bundles'
            sectionDescription={
                <div>
                    <Typography variant='body2' align='left' color='textSecondary'>
                        The following listing displays all "Parent" DRS Bundles,
                        that is, all bundles that contain the current DRS Object as
                        one of its Children.
                    </Typography>
                </div>
            }
            relationship="parents"
            objectName="parent"
            relatives={props.drs_object_parents}
            addRelative={props.addParent}
            setRelativeId={props.setParentId}
            setRelativeName={props.setParentName}
            setRelativeValid={props.setParentValid}
            setRelativeInvalid={props.setParentInvalid}
            unsetRelativeValidity={props.unsetParentValidity}
            removeRelative={props.removeParent}
            readOnly={props.readOnly}
        />
    )
}

export default DrsObjectParents;
