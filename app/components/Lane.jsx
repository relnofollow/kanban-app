import React from 'react';

import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import connect from '../libs/connect';
import Notes from './Notes';
import LaneHeader from './LaneHeader';

const Lane = ({lane, notes, NoteActions, className, ...props}) => {
    const deleteNote = (id, e) => {
        e.stopPropagation();

        LaneActions.detachFromLane({
            laneId: lane.id,
            noteId: id
        });

        NoteActions.delete(id);
    };

    const activateNoteEdit = (id, e) => {
        e.stopPropagation();

        NoteActions.update({id, editing: true});
    };

    const editNote = (id, task, e) => {
        e.stopPropagation();

        NoteActions.update({id, task, editing: false});
    };  
 
    return (
        <div className={className}>
            <LaneHeader lane={lane} />
            <Notes 
                notes={selectNotesByIds(notes, lane.notes)} 
                onDelete={deleteNote}
                onNoteClick={activateNoteEdit}
                onEdit={editNote} />
        </div>
    );
};

const selectNotesByIds = (allNotes, noteIds = []) => 
    allNotes.filter(note => noteIds.includes(note.id));


export default connect(
    ({notes}) => ({notes}), 
    {
        NoteActions, 
        LaneActions
    })(Lane)