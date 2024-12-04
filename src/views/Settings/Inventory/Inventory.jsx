import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import ProfitCenter from './ProfitCenter/ProfitCenter';
import Vendors from './Vendors/Vendors';
import ReferralGroup from './ReferralGroup/ReferralGroup';
import CommissionGroup from './CommissionGroup/CommissionGroup';
import CatalogItems from './CatalogItems/CatalogItems';
import CategoriesTags from './Categories/CategoriesTags';
import PrePays from './PrePays/PrePays';

export default function Inventory() {
    const tabs = [
        { title: 'Catalog Item', content: <CatalogItems /> },
        { title: 'Profit Center', content: <ProfitCenter /> },
        { title: 'Categories', content: <CategoriesTags /> },
        { title: 'Vendors', content: <Vendors /> },
        { title: 'Commission Group', content: <CommissionGroup /> },
        { title: 'Referral Group', content: <ReferralGroup /> },
        { title: 'Pre Pays', content: <PrePays /> },
    ];
    return <CustomTabView tabs={tabs} />;
}
