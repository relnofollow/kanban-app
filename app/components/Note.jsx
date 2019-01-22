import React from 'react';
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    }
}

const noteTarget = {
    drop(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const targetId = targetProps.id;
        const sourceId = sourceProps.id;

        if (sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId});
        }
    }
}

class Note extends React.Component {
    render() {
        const {connectDragSource, connectDropTarget, children, onMove, id, ...props} = this.props;
        
        return compose(connectDragSource, connectDropTarget)(
            <div {...props}>
                {children}
            </div>
        );
    }
}

export default compose(
    DragSource(ItemTypes.NOTE, noteSource, connect => ({
        connectDragSource: connect.dragSource()
    })),
    DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    }))
)(Note);