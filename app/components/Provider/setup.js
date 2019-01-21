import NoteStore from '../../stores/NoteStore';
import LaneStore from '../../stores/LaneStore';
import persist from '../../libs/persist';
import storage from '../../libs/storage';

export default alt => {
    alt.addStore('NoteStore', NoteStore);
    alt.addStore('LaneStore', LaneStore);

    persist(alt, storage(localStorage), 'app');
}