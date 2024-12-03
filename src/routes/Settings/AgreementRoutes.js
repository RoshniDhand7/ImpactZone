import { lazy } from 'react';
import AgreementPromotionsForm from '../../views/Settings/Agreement/AgreementPromotions/AgreementPromotionsForm';
import AgreementPlanForm from '../../views/Settings/Agreement/AgreementPlan/AgreementPlanForm';

const AgreementTemplateForm = lazy(() => import('../../views/Settings/Agreement/AgreementTemplate/AgreementTemplateForm'));
const AgreementCategoriesForm = lazy(() => import('../../views/Settings/Agreement/AgreementCategories/AgreementCategoriesForm'));
const AssessedFeesForm = lazy(() => import('../../views/Settings/Agreement/AssessedFees/AssessedFeesForm'));
const AgreementSettingsRoute = [
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
        path: '/agreement-plan/add',
        name: 'Membership Plan',
        exact: true,
        component: AgreementPlanForm,
    },
    {
        path: '/agreement-plan/edit/:id',
        name: 'Membership Plan',
        exact: true,
        component: AgreementPlanForm,
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
];
export default AgreementSettingsRoute;
