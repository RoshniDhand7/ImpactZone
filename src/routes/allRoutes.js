import { lazy } from 'react';

import Dashboard from '../views/Dashboard/Dashboard';
import CheckIn from '../views/CheckIn/CheckIn';
import Members from '../views/Members/Members';
import Calender from '../views/Calendar/Calendar';
import PointOfSale from '../views/PointOfSale/PointOfSale';
import Plans from '../views/Plans/Plans';
import More from '../views/More/More';
import Business from '../views/Settings/Business/Business';
import Settings from '../views/Settings/Settings';
import Agreement from '../views/Settings/Agreement/Agreement';
import Employees from '../views/Settings/Employees/Employees';
import ScheduleSetup from '../views/Settings/ScheduleSetup/ScheduleSetup';
import MembersSetup from '../views/Settings/MembersSetup/MembersSetup';
import Inventory from '../views/Settings/Inventory/Inventory';
import AcessGeneral from '../views/Settings/MembersSetup/AccessSchedule/AcessGeneral';
import AddCatalogItems from '../views/Settings/Inventory/CatalogItems/AddCatalogItems';
import AddandEditServices from '../views/Settings/ScheduleSetup/EventSetup/AddandEditServices';
import AgreementPromotionsForm from '../views/Settings/Agreement/AgreementPromotions/AgreementPromotionsForm';
import PointOfSaleSetUp from '../views/Settings/PointOfSale/PointOfSale';
import PaymentMethodsForm from '../views/Settings/PointOfSale/PaymentMethods/PaymentMethodsForm';
import DiscountForm from '../views/Settings/PointOfSale/Discount/DiscountForm';
import AddMembers from '../views/Members/AddMembers';
import Personal from '../views/Members/SidebarComponents/Personal';
import SellPlanForm from '../views/Plans/SellPlanForm';
import AllDrafts from '../views/Plans/AllDrafts';
import PlanAgreement from '../views/Plans/Agreement';
import SchedulingOptionsForm from '../views/Settings/ScheduleSetup/SchedulingOptionsForm';

const CompanyForm = lazy(() => import('../views/Settings/Business/Company/CompanyForm'));
const ReasonCodeForm = lazy(() => import('../views/Settings/Business/ReasonCode/ReasonCodeForm'));
const CustomizationForm = lazy(() => import('../views/Settings/Business/Customization/CustomizationForm'));
const ClubsForm = lazy(() => import('../views/Settings/Business/Clubs/ClubsForm'));
const JobTitleForm = lazy(() => import('../views/Settings/Business/JobTitle/JobTitleForm'));
const AgreementTemplateForm = lazy(() => import('../views/Settings/Agreement/AgreementTemplate/AgreementTemplateForm'));
const ViewEmployeeForm = lazy(() => import('../views/Settings/Employees/ManageEmployee/ViewEmployeeForm'));
const EmployeeForm = lazy(() => import('../views/Settings/Employees/ManageEmployee/AddEmployee/EmployeeForm'));
const CertificationForm = lazy(() => import('../views/Settings/Employees/ManageEmployee/AddEmployee/Certifications/CertificationForm'));
const SecurityRolesForm = lazy(() => import('../views/Settings/Employees/SecurityRoles/SecurityRolesForm'));
const DepartmentsForm = lazy(() => import('../views/Settings/Employees/Departments/DepartmentsForm'));
const LevelForm = lazy(() => import('../views/Settings/ScheduleSetup/Level/LevelForm'));
const LocationsForm = lazy(() => import('../views/Settings/ScheduleSetup/Locations/LocationsForm'));
const LocationTypeForm = lazy(() => import('../views/Settings/ScheduleSetup/LocationType/LocationTypeForm'));
const CampaignGroupForm = lazy(() => import('../views/Settings/MembersSetup/CampaignsGroup/CampaignGroupsForm'));
const CompaignsForm = lazy(() => import('../views/Settings/MembersSetup/Campaigns/CompaignsForm'));
const ResourceTypeForm = lazy(() => import('../views/Settings/MembersSetup/ResourceType/ResourceTypeForm'));
const ResourcesForm = lazy(() => import('../views/Settings/MembersSetup/Resources/ResourcesForm'));
const AgreementCategoriesForm = lazy(() => import('../views/Settings/Agreement/AgreementCategories/AgreementCategoriesForm'));
const ProfitCenterForm = lazy(() => import('../views/Settings/Inventory/ProfitCenter/ProfitCenterForm'));
const CategoriesForm = lazy(() => import('../views/Settings/Inventory/Categories/CategoriesForm'));
const VendorForm = lazy(() => import('../views/Settings/Inventory/Vendors/VendorForm'));
const ReferralGroupForm = lazy(() => import('../views/Settings/Inventory/ReferralGroup/ReferralGroupForm'));
const CommissionGroupForm = lazy(() => import('../views/Settings/Inventory/CommissionGroup/CommissionGroupForm'));
const MembershipTypeForm = lazy(() => import('../views/Settings/MembersSetup/MembershipTypes/MembershipTypeForm'));
const EventClassesForm = lazy(() => import('../views/Settings/ScheduleSetup/EventClasses/EventClassesForm'));
const EventCategoriesForm = lazy(() => import('../views/Settings/ScheduleSetup/EventCategories/EventCategoriesForm'));
const EventsForm = lazy(() => import('../views/Settings/ScheduleSetup/EventSetup/EventsForm'));
const AssessedFeesForm = lazy(() => import('../views/Settings/Agreement/AssessedFees/AssessedFeesForm'));
const MembershipPlanForm = lazy(() => import('../views/Settings/Agreement/MembershipPlan/MembershipPlanForm'));
const TaxForm = lazy(() => import('../views/Settings/PointOfSale/Tax/TaxForm'));

export const PrivateRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/check-in',
        name: 'Check In',
        component: CheckIn,
    },
    {
        path: '/member/:id',
        name: 'Members',
        component: Members,
    },
    {
        path: '/calender',
        name: 'Calender',
        component: Calender,
    },
    {
        path: '/pos',
        name: 'Point Of Sale',
        component: PointOfSale,
    },
    {
        path: '/plans',
        name: 'Plans',
        component: Plans,
        exact: true,
        items: [
            {
                path: '/sell-plan/:id',
                name: 'Sell Plan',
                exact: true,
                component: SellPlanForm,
            },
            {
                path: '/sell-plan/:id/:newPlanId/:memberId/',
                name: 'Sell Plan',
                exact: true,
                component: SellPlanForm,
            },
            {
                path: '/drafts',
                name: 'Drafts',
                exact: true,
                component: AllDrafts,
            },
            {
                path: '/plan-agreements/:newPlanId/:memberId/:agreementId',
                name: 'Plan Agreement',
                exact: true,
                component: PlanAgreement,
            },
        ],
    },
    {
        path: '/more',
        name: 'More',
        component: More,
    },
    {
        path: '/members/add',
        name: 'Members',
        component: AddMembers,
    },
    {
        path: '/settings',
        name: 'Settings',
        exact: true,
        component: Settings,
        items: [
            {
                path: '/business',
                name: 'Business',
                exact: true,
                component: Business,
                items: [
                    {
                        path: '/company/edit',
                        name: 'Business',
                        exact: true,
                        component: CompanyForm,
                    },
                    {
                        path: '/reason-code/add',
                        name: 'Business',
                        exact: true,
                        component: ReasonCodeForm,
                    },
                    {
                        path: '/reason-code/edit/:id',
                        name: 'Business',
                        exact: true,
                        component: ReasonCodeForm,
                    },
                    {
                        path: '/customization/edit',
                        name: 'Business',
                        exact: true,
                        component: CustomizationForm,
                    },
                    {
                        path: '/clubs/edit/:id',
                        name: 'Business',
                        exact: true,
                        component: ClubsForm,
                    },
                    {
                        path: '/job-title/add',
                        name: 'Business',
                        exact: true,
                        component: JobTitleForm,
                    },
                    {
                        path: '/job-title/edit/:id',
                        name: 'Business',
                        exact: true,
                        component: JobTitleForm,
                    },
                ],
            },
            {
                path: '/inventory',
                name: 'Inventory',
                exact: true,
                component: Inventory,
                items: [
                    {
                        path: '/catalog-item/add',
                        name: 'Catalog Item',
                        exact: true,
                        component: AddCatalogItems,
                    },
                    {
                        path: '/catalog-item/edit/:id',
                        name: 'Catalog Item',
                        exact: true,
                        component: AddCatalogItems,
                    },
                    {
                        path: '/profit-center/add',
                        name: 'Profit Center',
                        exact: true,
                        component: ProfitCenterForm,
                    },
                    {
                        path: '/profit-center/edit/:id',
                        name: 'Profit Center',
                        exact: true,
                        component: ProfitCenterForm,
                    },
                    {
                        path: '/categories/add',
                        name: 'Profit Center',
                        exact: true,
                        component: CategoriesForm,
                    },
                    {
                        path: '/categories/edit/:id',
                        name: 'Profit Center',
                        exact: true,
                        component: CategoriesForm,
                    },
                    {
                        path: '/vendor/add',
                        name: 'Profit Center',
                        exact: true,
                        component: VendorForm,
                    },
                    {
                        path: '/vendor/edit/:id',
                        name: 'Profit Center',
                        exact: true,
                        component: VendorForm,
                    },
                    {
                        path: '/referral-group/add',
                        name: 'Referral Group',
                        exact: true,
                        component: ReferralGroupForm,
                    },
                    {
                        path: '/referral-group/edit/:id',
                        name: 'Referral Group',
                        exact: true,
                        component: ReferralGroupForm,
                    },
                    {
                        path: '/commission-group/add',
                        name: 'Commission Group',
                        exact: true,
                        component: CommissionGroupForm,
                    },
                    {
                        path: '/commission-group/edit/:id',
                        name: 'Commission Group',
                        exact: true,
                        component: CommissionGroupForm,
                    },
                ],
            },
            {
                path: '/employee',
                name: 'Employee',
                exact: true,
                component: Employees,
                items: [
                    {
                        path: '/manage-employee/add',
                        name: 'Employee',
                        exact: true,
                        component: EmployeeForm,
                        items: [{ path: '/certifications/:employeeId', name: 'Employee', exact: true, component: CertificationForm }],
                    },
                    {
                        path: '/manage-employee/edit/:id',
                        name: 'Employee',
                        exact: true,
                        component: EmployeeForm,
                        items: [{ path: '/certifications/:employeeId', name: 'Employee', component: CertificationForm }],
                    },
                    {
                        path: '/manage-employee/view/:id',
                        name: 'Employee',
                        exact: true,
                        component: ViewEmployeeForm,
                    },
                    {
                        path: '/departments/add',
                        name: 'Employee',
                        exact: true,
                        component: DepartmentsForm,
                    },
                    {
                        path: '/departments/edit/:id',
                        name: 'Employee',
                        exact: true,
                        component: DepartmentsForm,
                    },
                    {
                        path: '/security-roles/add',
                        name: 'Employee',
                        exact: true,
                        component: SecurityRolesForm,
                    },
                    {
                        path: '/security-roles/edit/:id',
                        name: 'Employee',
                        exact: true,
                        component: SecurityRolesForm,
                    },
                ],
            },
            {
                path: '/schedule',
                name: 'Schedule',
                exact: true,
                component: ScheduleSetup,
                items: [
                    {
                        path: '/levels/add',
                        name: 'Schedule',
                        exact: true,
                        component: LevelForm,
                    },
                    {
                        path: '/levels/edit/:id',
                        name: 'Business',
                        exact: true,
                        component: LevelForm,
                    },
                    {
                        path: '/levels/scheduling/',
                        name: 'Scheduling',
                        exact: true,
                        component: SchedulingOptionsForm,
                    },
                    {
                        path: '/location-type/add',
                        name: 'Schedule',
                        exact: true,
                        component: LocationTypeForm,
                    },
                    {
                        path: '/location-type/edit/:id',
                        name: 'Schedule',
                        exact: true,
                        component: LocationTypeForm,
                    },
                    {
                        path: '/locations/add',
                        name: 'Schedule',
                        exact: true,
                        component: LocationsForm,
                    },
                    {
                        path: '/locations/edit/:id',
                        name: 'Schedule',
                        exact: true,
                        component: LocationsForm,
                    },
                    {
                        path: '/events/add',
                        name: 'Schedule',
                        exact: true,
                        component: EventsForm,
                    },
                    {
                        path: '/events/edit/:id',
                        name: 'Schedule',
                        exact: true,
                        component: EventsForm,
                        items: [
                            { path: '/services/add', name: 'Services', component: AddandEditServices },
                            { path: '/services/edit/:eventId', name: 'Services', component: AddandEditServices },
                        ],
                    },
                    {
                        path: '/event-categories/add',
                        name: 'Schedule',
                        exact: true,
                        component: EventCategoriesForm,
                    },
                    {
                        path: '/event-categories/edit/:id',
                        name: 'Schedule',
                        exact: true,
                        component: EventCategoriesForm,
                    },
                    {
                        path: '/classes/add',
                        name: 'Schedule',
                        exact: true,
                        component: EventClassesForm,
                    },
                    {
                        path: '/classes/edit/:id',
                        name: 'Schedule',
                        exact: true,
                        component: EventClassesForm,
                    },
                ],
            },
            {
                path: '/agreement',
                name: 'Agreement',
                exact: true,
                component: Agreement,
                items: [
                    {
                        path: '/template/add',
                        name: 'Agreement Template',
                        exact: true,
                        component: AgreementTemplateForm,
                    },
                    {
                        path: '/template/edit/:id',
                        name: 'Agreement Template',
                        exact: true,
                        component: AgreementTemplateForm,
                    },
                    {
                        path: '/categories/add',
                        name: 'Agreement Categories',
                        exact: true,
                        component: AgreementCategoriesForm,
                    },
                    {
                        path: '/categories/edit/:id',
                        name: 'Agreement Categories',
                        exact: true,
                        component: AgreementCategoriesForm,
                    },
                    {
                        path: '/assessed-fees/add',
                        name: 'Assessed Fee',
                        exact: true,
                        component: AssessedFeesForm,
                    },
                    {
                        path: '/assessed-fees/edit/:id',
                        name: 'Assessed Fee',
                        exact: true,
                        component: AssessedFeesForm,
                    },
                    {
                        path: '/membership-plan/add',
                        name: 'Membership Plan',
                        exact: true,
                        component: MembershipPlanForm,
                    },
                    {
                        path: '/membership-plan/edit/:id',
                        name: 'Membership Plan',
                        exact: true,
                        component: MembershipPlanForm,
                    },
                    {
                        path: '/agreement-promotions/add',
                        name: 'Agreement Promotions',
                        exact: true,
                        component: AgreementPromotionsForm,
                    },
                    {
                        path: '/agreement-promotions/edit/:id',
                        name: 'Agreement Promotions',
                        exact: true,
                        component: AgreementPromotionsForm,
                    },
                ],
            },
            {
                path: '/members',
                name: 'Members',
                exact: true,
                component: MembersSetup,
                items: [
                    {
                        path: '/membership-types/add',
                        name: 'Members',
                        exact: true,
                        component: MembershipTypeForm,
                    },
                    {
                        path: '/membership-types/edit/:id',
                        name: 'Members',
                        exact: true,
                        component: MembershipTypeForm,
                    },
                    {
                        path: '/campaign-group/add',
                        name: 'Members',
                        exact: true,
                        component: CampaignGroupForm,
                    },
                    {
                        path: '/campaign-group/edit/:id',
                        name: 'Members',
                        exact: true,
                        component: CampaignGroupForm,
                    },
                    {
                        path: '/campaigns/add',
                        name: 'Members',
                        exact: true,
                        component: CompaignsForm,
                    },
                    {
                        path: '/campaigns/edit/:id',
                        name: 'Members',
                        exact: true,
                        component: CompaignsForm,
                    },
                    {
                        path: '/resource-type/add',
                        name: 'Members',
                        exact: true,
                        component: ResourceTypeForm,
                    },
                    {
                        path: '/resource-type/edit/:id',
                        name: 'Members',
                        exact: true,
                        component: ResourceTypeForm,
                    },
                    {
                        path: '/resources/add',
                        name: 'Members',
                        exact: true,
                        component: ResourcesForm,
                    },
                    {
                        path: '/resources/edit/:id',
                        name: 'Members',
                        exact: true,
                        component: ResourcesForm,
                    },
                    {
                        path: '/access-schedule/add',
                        name: 'Access Schedule',
                        exact: true,
                        component: AcessGeneral,
                    },
                    {
                        path: '/access-schedule/edit/:id',
                        name: 'Access Schedule',
                        exact: true,
                        component: AcessGeneral,
                    },
                ],
            },
            {
                path: '/pos',
                name: 'POS',
                exact: true,
                component: PointOfSaleSetUp,
                items: [
                    {
                        path: '/tax/add',
                        name: 'Tax',
                        exact: true,
                        component: TaxForm,
                    },
                    {
                        path: '/tax/edit/:id',
                        name: 'Tax',
                        exact: true,
                        component: TaxForm,
                    },
                    {
                        path: '/payment-methods/add',
                        name: 'PaymentMethods',
                        exact: true,
                        component: PaymentMethodsForm,
                    },
                    {
                        path: '/payment-methods/edit/:id',
                        name: 'PaymentMethods',
                        exact: true,
                        component: PaymentMethodsForm,
                    },
                    {
                        path: '/discount/add',
                        name: 'Discount',
                        exact: true,
                        component: DiscountForm,
                    },
                    {
                        path: '/discount/edit/:id',
                        name: 'Discount',
                        exact: true,
                        component: DiscountForm,
                    },
                ],
            },
        ],
    },
];
