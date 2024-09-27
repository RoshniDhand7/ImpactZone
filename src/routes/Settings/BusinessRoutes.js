import { lazy } from 'react';
import ClubsForm from '../../views/Settings/Business/Clubs/ClubsForm';
const CompanyForm = lazy(() => import('../../views/Settings/Business/Company/CompanyForm'));
const ReasonCodeForm = lazy(() => import('../../views/Settings/Business/ReasonCode/ReasonCodeForm'));
const CustomizationForm = lazy(() => import('../../views/Settings/Business/Customization/CustomizationForm'));
// const ClubsForm = lazy(() => import('../../views/Settings/Business/Clubs/ClubsForm'));
const JobTitleForm = lazy(() => import('../../views/Settings/Business/JobTitle/JobTitleForm'));

const BusinessSettingRoutes = [
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
];
export default BusinessSettingRoutes;
