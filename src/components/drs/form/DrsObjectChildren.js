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
            relationship="children"
            objectName="child"
            activeDrsObject={props.activeDrsObject}
            relatives={props.children}
            addRelative={props.addChild}
            setRelativeId={props.setChildId}
            unsetRelativeValidity={props.unsetChildValidity}
            removeRelative={props.removeChild}
            retrieveDrsObject={props.retrieveDrsObject}
            readOnly={props.readOnly}
        />
    )
}

export default DrsObjectChildren;
