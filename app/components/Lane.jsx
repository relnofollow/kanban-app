import React from 'react';
import uuid from 'uuid';

import NoteActions from '../actions/NoteActions';
import connect from '../libs/connect';
import Notes from './Notes';

const Lane = ({lane, notes, NoteActions, ...props}) => {
    const addNote = () => {
        NoteActions.create({
            id: uuid.v4(),
            task: 'New task'
        });
    };

    const deleteNote = (id, e) => {
        e.stopPropagation();

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
        <div>
            <div className="lane-header">
                <div className="lane-add-note">
                    <button className="add-note" onClick={addNote}>+</button>
                </div>
                <div className="lane-name">{lane.name}</div>
            </div>
            <Notes 
                notes={notes} 
                onDelete={deleteNote}
                onNoteClick={activateNoteEdit}
                onEdit={editNote} />
        </div>
    );
};

export default connect(({notes}) => ({notes}), {NoteActions})(Lane)