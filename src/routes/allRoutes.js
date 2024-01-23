import Dashboard from '../views/Dashboard/Dashboard';
import CheckIn from '../views/CheckIn/CheckIn';
import Members from '../views/Members/Members';
import Calender from '../views/Calendar/Calendar';
import PointOfSale from '../views/PointOfSale/PointOfSale';
import Plans from '../views/Plans/Plans';
import More from '../views/More/More';
import Business from '../views/Settings/Business/Business';
import Settings from '../views/Settings/Settings';
import CompanyForm from '../views/Settings/Business/Company/CompanyForm';
import ReasonCodeForm from '../views/Settings/Business/ReasonCode/ReasonCodeForm';
import CustomizationForm from '../views/Settings/Business/Customization/CustomizationForm';
import ClubsForm from '../views/Settings/Business/Clubs/ClubsForm';
import JobTitleForm from '../views/Settings/Business/JobTitle/JobTitleForm';
import Agreement from '../views/Settings/Agreement/Agreement';
import AgreementTemplateForm from '../views/Settings/Agreement/AgreementTemplate/AgreementTemplateForm';
import Employees from '../views/Settings/Employees/Employees';
import ViewEmployeeForm from '../views/Settings/Employees/ManageEmployee/ViewEmployeeForm';
import EmployeeForm from '../views/Settings/Employees/ManageEmployee/AddEmployee/EmployeeForm';
import CertificationForm from '../views/Settings/Employees/ManageEmployee/AddEmployee/Certifications/CertificationForm';
import SecurityRolesForm from '../views/Settings/Employees/SecurityRoles/SecurityRolesForm';
import DepartmentsForm from '../views/Settings/Employees/Departments/DepartmentsForm';
import ScheduleSetup from '../views/Settings/ScheduleSetup/ScheduleSetup';
import LevelForm from '../views/Settings/ScheduleSetup/Level/LevelForm';
import LocationsForm from '../views/Settings/ScheduleSetup/Locations/LocationsForm';
import LocationTypeForm from '../views/Settings/ScheduleSetup/LocationType/LocationTypeForm';
import MembersSetup from '../views/Settings/MembersSetup/MembersSetup';
import CampaignGroupForm from '../views/Settings/MembersSetup/CampaignsGroup/CampaignGroupsForm';
import CompaignsForm from '../views/Settings/MembersSetup/Campaigns/CompaignsForm';
import ResourceTypeForm from '../views/Settings/MembersSetup/ResourceType/ResourceTypeForm';
import ResourcesForm from '../views/Settings/MembersSetup/Resources/ResourcesForm';

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
        path: '/members',
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
    },
    {
        path: '/more',
        name: 'More',
        component: More,
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
                        items: [{ path: '/certifications', name: 'Employee', exact: true, component: CertificationForm }],
                    },
                    {
                        path: '/manage-employee/edit/:id',
                        name: 'Employee',
                        exact: true,
                        component: EmployeeForm,
                        items: [{ path: '/certifications', name: 'Employee', exact: true, component: CertificationForm }],
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
                ],
            },
            {
                path: '/members',
                name: 'Members',
                exact: true,
                component: MembersSetup,
                items: [
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
                ],
            },
        ],
    },
];
