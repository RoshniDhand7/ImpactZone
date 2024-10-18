import { lazy } from 'react';
import AddAvailability from '../../views/Settings/Employees/Availability/AddAvailability';

const ViewEmployeeForm = lazy(() => import('../../views/Settings/Employees/ManageEmployee/ViewEmployeeForm'));
const EmployeeForm = lazy(() => import('../../views/Settings/Employees/ManageEmployee/AddEmployee/EmployeeForm'));
const CertificationForm = lazy(() => import('../../views/Settings/Employees/ManageEmployee/AddEmployee/Certifications/CertificationForm'));
const SecurityRolesForm = lazy(() => import('../../views/Settings/Employees/SecurityRoles/SecurityRolesForm'));
const DepartmentsForm = lazy(() => import('../../views/Settings/Employees/Departments/DepartmentsForm'));
const EmployeeSettingRoute = [
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
        path: '/availability/add',
        name: 'Employee Availablity',
        exact: true,
        component: AddAvailability,
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
];
export default EmployeeSettingRoute;
