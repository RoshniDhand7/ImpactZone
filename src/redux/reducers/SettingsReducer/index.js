import { combineReducers } from 'redux';
import InventoryReducer from './InventoryReducer';
import PosReducer from './PosReducer';
import MembershipReducer from './MembershipReducer';
import AgreementReducer from './AgreementReducer';

export default combineReducers({
    pos: PosReducer,
    inventory: InventoryReducer,
    members: MembershipReducer,
    agreement: AgreementReducer,
});
