import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';
import profileReducer from './profileReducer';
import employeesReducer from './EmployeesSettings/employeesReducer';
import securityRolesReducer from './EmployeesSettings/securityRolesReducer';
import departmentReducer from './EmployeesSettings/departmentsReducer';
import referralGroupReducer from './InventorySettings/referralGroupsReducer';
import commissionGroupReducer from './InventorySettings/commissionGroupsReducer';
import VendorsReducer from './InventorySettings/vendorsReducer';
import categoryReducer from './InventorySettings/categoryReducer';
import profitCenterReducer from './InventorySettings/profitCenterReducer';
import certificateReducer from './EmployeesSettings/certificationReducer';
import catalogItemsReducer from './InventorySettings/catalogItemsReducer';
import taxReducer from './PosSettings/taxReducer';
import paymentMethodReducer from './PosSettings/PaymentMethodsReducer';
import discountTypeReducer from './PosSettings/discountTypeReducer';
import plansReducer from './Plans/plansReducer';
import filterSetReducer from './InventorySettings/filterSetReducer';
import tagsReducer from './InventorySettings/tagsReducer';

import dashboardReducer from './Dashboard/DashboardReducer';

import RegisterReducer from './PosSettings/registerReducer';
import drawersReducer from './More/DrawersReducer';
import moreAttendanceReducer from './More/AttendanceReducer';
import availabilityReducer from './EmployeesSettings/availabilityReducer';

import SettingsReducer from './SettingsReducer';
import POSReducer from './POSReducer';
import checkInReducer from './CheckIn/CheckInReducer';
import tableLoaderReducer from './tableLoaderReducer';
import membersPortalReducer from './Members/MembersReducer';

export default combineReducers({
    loader: loaderReducer,
    toast: toastReducer,
    tableLoader: tableLoaderReducer,
    profile: profileReducer,
    employees: employeesReducer,
    securityRole: securityRolesReducer,
    department: departmentReducer,
    referralGroup: referralGroupReducer,
    commissionGroup: commissionGroupReducer,
    vendors: VendorsReducer,
    membersPortal: membersPortalReducer,
    category: categoryReducer,
    profitCenter: profitCenterReducer,
    certificates: certificateReducer,
    catalogItems: catalogItemsReducer,
    taxes: taxReducer,
    paymentMethod: paymentMethodReducer,
    discountType: discountTypeReducer,
    plans: plansReducer,
    filterSet: filterSetReducer,
    tags: tagsReducer,
    dashboard: dashboardReducer,
    registers: RegisterReducer,
    drawers: drawersReducer,
    settings: SettingsReducer,
    pos: POSReducer,
    moreAttendance: moreAttendanceReducer,
    employeeAvailability: availabilityReducer,
    checkin: checkInReducer,
});
