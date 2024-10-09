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
import PointOfSaleSetUp from '../views/Settings/PointOfSale/PointOfSale';
import AddMembers from '../views/Members/AddMembers';
import SellPlanForm from '../views/Plans/SellPlanForm';
import AllDrafts from '../views/Plans/AllDrafts';
import PlanAgreement from '../views/Plans/Agreement';
import BusinessSettingRoutes from './Settings/BusinessRoutes';
import InventorySettingsRoutes from './Settings/InventoryRoutes';
import EmployeeSettingRoute from './Settings/EmployeeRoutes';
import ScheduleSettingRoutes from './Settings/ScheduleRoutes';
import AgreementSettingsRoute from './Settings/AgreementRoutes';
import MemberSettingsRoutes from './Settings/MemberRoutes';
import PointOfSaleSettingRoutes from './Settings/PointOfSaleRoutes';
import AllMembers from '../views/Members/AllMembers';
import PointOfSale2 from '../views/PointOfSale/PointOfSale2';
import MorePos from '../views/More/MorePos';
import DrawerSummary from '../views/More/DrawerSummary/DrawerSummary';
import Drawers from '../views/More/Drawers/Drawers';

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
        name: 'Member',
        component: Members,
    },
    {
        path: '/allMembers/',
        name: 'Members',
        component: AllMembers,
    },
    {
        path: '/calender',
        name: 'Calender',
        component: Calender,
    },
    {
        path: '/pos2',
        name: 'Point Of Sale',
        component: PointOfSale,
    },
    {
        path: '/pos',
        name: 'Point Of Sale',
        component: PointOfSale2,
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
        exact: true,
        component: More,
        items: [
            {
                path: '/pos',
                name: 'POS',
                exact: true,
                component: MorePos,
                items: [
                    {
                        path: '/drawer-summary',
                        name: 'Drawer Summary',
                        exact: true,
                        component: DrawerSummary,
                    },
                    {
                        path: '/drawers',
                        name: 'Drawers',
                        exact: true,
                        component: Drawers,
                    },
                ],
            },
        ],
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
                items: BusinessSettingRoutes,
            },
            {
                path: '/inventory',
                name: 'Inventory',
                exact: true,
                component: Inventory,
                items: InventorySettingsRoutes,
            },
            {
                path: '/employee',
                name: 'Employee',
                exact: true,
                component: Employees,
                items: EmployeeSettingRoute,
            },
            {
                path: '/schedule',
                name: 'Schedule',
                exact: true,
                component: ScheduleSetup,
                items: ScheduleSettingRoutes,
            },
            {
                path: '/agreement',
                name: 'Agreement',
                exact: true,
                component: Agreement,
                items: AgreementSettingsRoute,
            },
            {
                path: '/members',
                name: 'Members',
                exact: true,
                component: MembersSetup,
                items: MemberSettingsRoutes,
            },
            {
                path: '/pos',
                name: 'POS',
                exact: true,
                component: PointOfSaleSetUp,
                items: PointOfSaleSettingRoutes,
            },
        ],
    },
];
