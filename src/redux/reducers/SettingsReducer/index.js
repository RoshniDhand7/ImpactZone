import { combineReducers } from 'redux';
import InventoryReducer from './InventoryReducer';
import PosReducer from './PosReducer';
import MembershipReducer from './MembershipReducer';

export default combineReducers({
    pos: PosReducer,
    inventory: InventoryReducer,
    members: MembershipReducer,
});
