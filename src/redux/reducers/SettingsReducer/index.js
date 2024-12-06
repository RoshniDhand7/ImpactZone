import { combineReducers } from 'redux';
import InventoryReducer from './InventoryReducer';
import PosReducer from './PosReducer';
import MembershipReducer from './MembershipReducer';
import AgreementReducer from './AgreementReducer';
import businessReducer from './BusinessReducer';
import scheduleReducer from './ScheduleReducer';
import employeeReducer from './EmployeeReducer';

export default combineReducers({
    pos: PosReducer,
    inventory: InventoryReducer,
    members: MembershipReducer,
    agreement: AgreementReducer,
    business: businessReducer,
    schedule: scheduleReducer,
    employee: employeeReducer,
});
