import React from 'react';
import uuid from 'uuid';

import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable';

const LaneHeader = ({lane, NoteActions, LaneActions, ...props}) => {
    const addNote = (e) => {
        e.stopPropagation();

        const noteId = uuid.v4();

        NoteActions.create({
            id: noteId,
            task: 'New task'
        });

        LaneActions.attachToLane({
            laneId: lane.id,
            noteId 
        });
    };

    const editName = (name, e) => {
        e.stopPropagation();

        LaneActions.update({
            id: lane.id,
            name,
            editing: false 
        });
    };

    const activateLaneEdit = (e) => {
        e.stopPropagation();

        LaneActions.update({
            id: lane.id,
            editing: true 
        });
    };

    const deleteLane = (e) => {
        e.stopPropagation();

        LaneActions.delete(lane.id);
    };

    return (
        <div className="lane-header" onClick={activateLaneEdit} {...props}>
            <div className="lane-add-note">
                <button className="add-note" onClick={addNote}>+</button>
            </div>
            <Editable 
                className="lane-name"
                editing={lane.editing} 
                value={lane.name}
                onEdit={editName}/>
            <button className="lane-delete" onClick={deleteLane}>x</button>
        </div>
    );
};

export default connect(() => ({}), { NoteActions, LaneActions })(LaneHeader)