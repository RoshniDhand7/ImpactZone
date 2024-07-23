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
import accessScheduleReducer from './MembersSettings/accessScheduleReducer';
import catalogItemsReducer from './InventorySettings/catalogItemsReducer';
import eventReducer from './ScheduleSettings/eventsReducer';
import eventCategoryReducer from './ScheduleSettings/eventCategories';
import eventClassesReducer from './ScheduleSettings/eventClassesReducer';
import membershipTypeReducer from './MembersSettings/membershipTypeReducer';
import assesedFeesReducer from './AgreementSettings/assessedFeesReducer';
import membershipPlanReducer from './AgreementSettings/membershipPlanReducer';
import agreementPromotionReducer from './AgreementSettings/agreementPromotionsReducer';
import taxReducer from './PosSettings/taxReducer';
import paymentMethodReducer from './PosSettings/PaymentMethodsReducer';
import discountTypeReducer from './PosSettings/discountTypeReducer';
import memberReducer from './Dashboard/MembersReducer';
import sellPlanReducer from './Plans/SellPlanReducer';
import schedulingOptionsReducer from './ScheduleSettings/SchedulingOptionsReducer';

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
    accessSchedule: accessScheduleReducer,
    catalogItems: catalogItemsReducer,
    event: eventReducer,
    eventCategory: eventCategoryReducer,
    eventClasses: eventClassesReducer,
    membershipTypes: membershipTypeReducer,
    assessedFees: assesedFeesReducer,
    membershipPlan: membershipPlanReducer,
    agreementPromotion: agreementPromotionReducer,
    taxes: taxReducer,
    paymentMethod: paymentMethodReducer,
    discountType: discountTypeReducer,
    members: memberReducer,
    plans: sellPlanReducer,
    schedulingOptions: schedulingOptionsReducer,
});
