import { combineReducers } from 'redux';
import InventoryReducer from './InventoryReducer';
import PosReducer from './PosReducer';

export default combineReducers({
    pos: PosReducer,
    inventory: InventoryReducer,
});
