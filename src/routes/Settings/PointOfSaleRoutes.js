import { lazy } from 'react';

import PaymentMethodsForm from '../../views/Settings/PointOfSale/PaymentMethods/PaymentMethodsForm';
import DiscountForm from '../../views/Settings/PointOfSale/Discount/DiscountForm';
import RegisterForm from '../../views/Settings/PointOfSale/Registers/RegisterForm';
const TaxForm = lazy(() => import('../../views/Settings/PointOfSale/Tax/TaxForm'));

const PointOfSaleSettingRoutes = [
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
    {
        path: '/register/add',
        name: 'Register',
        exact: true,
        component: RegisterForm,
    },
    {
        path: '/register/edit/:id',
        name: 'Register',
        exact: true,
        component: RegisterForm,
    },
];
export default PointOfSaleSettingRoutes;
