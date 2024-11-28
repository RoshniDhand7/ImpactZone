import { combineReducers } from 'redux';
import InventoryReducer from './InventoryReducer';
import PosReducer from './PosReducer';
import MembershipReducer from './MembershipReducer';
import AgreementReducer from './AgreementReducer';
import businessReducer from './BusinessReducer';

export default combineReducers({
    pos: PosReducer,
    inventory: InventoryReducer,
    members: MembershipReducer,
    agreement: AgreementReducer,
    business: businessReducer,
});
