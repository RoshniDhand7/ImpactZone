import { lazy } from 'react';

const ProfitCenterForm = lazy(() => import('../../views/Settings/Inventory/ProfitCenter/ProfitCenterForm'));
const CategoriesForm = lazy(() => import('../../views/Settings/Inventory/Categories/CategoriesForm'));
const VendorForm = lazy(() => import('../../views/Settings/Inventory/Vendors/VendorForm'));
const ReferralGroupForm = lazy(() => import('../../views/Settings/Inventory/ReferralGroup/ReferralGroupForm'));
const CommissionGroupForm = lazy(() => import('../../views/Settings/Inventory/CommissionGroup/CommissionGroupForm'));
const PrePayForm = lazy(() => import('../../views/Settings/Inventory/PrePays/PrePayForm'));
const AddCatalogItems = lazy(() => import('../../views/Settings/Inventory/CatalogItems/AddCatalogItems'));
const InventorySettingsRoutes = [
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
    {
        path: '/pre-pay/add',
        name: 'Pre Pay',
        exact: true,
        component: PrePayForm,
    },
    {
        path: '/pre-pay/edit/:id',
        name: 'Pre Pay',
        exact: true,
        component: PrePayForm,
    },
];
export default InventorySettingsRoutes;
