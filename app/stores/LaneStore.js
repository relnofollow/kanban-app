import update from 'immutability-helper';
import LaneActions from '../actions/LaneActions';

export default class LaneStore {
    constructor() {
        this.bindActions(LaneActions);
        this.lanes = [];
    }

    create(lane) {
        lane.notes = lane.notes || [];
        this.setState({
            lanes: this.lanes.concat(lane)
        });
    }

    update(updatedLane) {
        this.setState({
            lanes: this.lanes.map(lane => {
                if (lane.id === updatedLane.id) {
                    return Object.assign({}, lane, updatedLane);
                }

                return lane;
            })
        });
    }

    delete(laneId) {
        this.setState({
            lanes: this.lanes.filter(lane => lane.id !== laneId)
        });
    }

    move({sourceId, targetId}) {
        const sourceLane = this.lanes.find(lane => lane.notes.includes(sourceId));
        const targetLane = this.lanes.find(lane => lane.notes.includes(targetId));

        const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
        const targetNoteIndex = targetLane.notes.indexOf(targetId);
        
        if (sourceLane === targetLane) {
            sourceLane.notes = update(sourceLane.notes, {
                $splice: [
                    [sourceNoteIndex, 1],
                    [targetNoteIndex, 0, sourceId]
                ]
            });
            
            console.log(`move WITHIN line: source: ${sourceId}, target: ${targetId}`);
        } else {
            sourceLane.notes.splice(sourceNoteIndex, 1);
            targetLane.notes.splice(targetNoteIndex, 0, sourceId);

            console.log(`move BETWEEN lines: source: ${sourceId}, target: ${targetId}`);
        }

        this.setState({
            lanes: this.lanes
        });
    }

    attachToLane({laneId, noteId}) {
        this.setState({
            lanes: this.lanes.map(lane => {
                if (lane.notes.includes(noteId)) {
                    lane.notes = lane.notes.filter(id => id !== noteId);
                }

                if (lane.id === laneId) {
                    lane.notes = lane.notes.concat(noteId);
                }

                return lane;
            })
        });
    }

    detachFromLane({laneId, noteId}) {
        this.setState({
            lanes: this.lanes.map(lane => {
                if (lane.id == laneId) {
                    lane.notes = lane.notes.filter(id => id !== noteId);
                }

                return lane;
            })
        });
    }
}