import React from 'react';
import Note from './Note';
import Editable from './Editable';
import LaneActions from '../actions/LaneActions';

const Notes = ({notes, onDelete, onNoteClick, onEdit}) => {
    return (
        <ul className="notes">
            {notes.map(note => { 
                return (
                    <li key={note.id}>
                        <Note 
                            id={note.id}
                            className="note"
                            onClick={onNoteClick.bind(null, note.id)}
                            onMove={LaneActions.move}>
                            <Editable 
                                className="editable"
                                editing={note.editing} 
                                value={note.task}
                                onEdit={onEdit.bind(null, note.id)}/>
                            <button 
                                className="delete"
                                onClick={onDelete.bind(null, note.id)}>x</button>    
                        </Note>
                    </li>
                );
            })}
        </ul>
    );
}

export default Notes;