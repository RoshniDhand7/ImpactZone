import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';
import profileReducer from './profileReducer';
import companyReducer from './BusinessSettings/companyReducer';
import reasonCodeReducer from './BusinessSettings/reasonReducer';
import jobTitleReducer from './BusinessSettings/jobReducer';
import clubsReducer from './BusinessSettings/clubsReducer';
import employeesReducer from './EmployeesSettings/employeesReducer';
import securityRolesReducer from './EmployeesSettings/securityRolesReducer';
import departmentReducer from './EmployeesSettings/departmentsReducer';
import levelReducer from './ScheduleSettings/levelReducer';
import locationTypeReducer from './ScheduleSettings/locationTypesReducer';
import locationsReducer from './ScheduleSettings/locationReducer';
import comapignGroupReducer from './MembersSettings/compaignGroupReducer';
import camapignReducer from './MembersSettings/campaignReducer';
import resourceTypeReducer from './MembersSettings/resourceTypeReducer';
import resourcesReducer from './MembersSettings/resourcesReducer';
import agreementReducer from './AgreementSettings/agreementReducer';
import referralGroupReducer from './InventorySettings/referralGroupsReducer';
import commissionGroupReducer from './InventorySettings/commissionGroupsReducer';
import VendorsReducer from './InventorySettings/vendorsReducer';
import categoryReducer from './InventorySettings/categoryReducer';
import profitCenterReducer from './InventorySettings/profitCenterReducer';
import certificateReducer from './EmployeesSettings/certificationReducer';

export default combineReducers({
    loader: loaderReducer,
    toast: toastReducer,
    profile: profileReducer,
    company: companyReducer,
    reasonCode: reasonCodeReducer,
    jobTitle: jobTitleReducer,
    clubs: clubsReducer,
    employees: employeesReducer,
    securityRole: securityRolesReducer,
    department: departmentReducer,
    level: levelReducer,
    locationType: locationTypeReducer,
    locations: locationsReducer,
    compaignGroups: comapignGroupReducer,
    campaign: camapignReducer,
    resourceType: resourceTypeReducer,
    resources: resourcesReducer,
    agreement: agreementReducer,
    referralGroup: referralGroupReducer,
    commissionGroup: commissionGroupReducer,
    vendors: VendorsReducer,
    category: categoryReducer,
    profitCenter: profitCenterReducer,
    certificates: certificateReducer,
});
