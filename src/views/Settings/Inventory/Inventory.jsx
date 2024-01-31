import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import ProfitCenter from './ProfitCenter/ProfitCenter';
import Categories from './Categories/Categories';
import Vendors from './Vendors/Vendors';
import ReferralGroup from './ReferralGroup/ReferralGroup';
import CommissionGroup from './CommissionGroup/CommissionGroup';

export default function Inventory() {
    const tabs = [
        { title: 'Catalog Item', content: <>Catelog Item</> },
        { title: 'Profit Center', content: <ProfitCenter /> },
        { title: 'Categories', content: <Categories /> },
        { title: 'Vendors', content: <Vendors /> },
        { title: 'Commission Group', content: <CommissionGroup /> },
        { title: 'Referral Group', content: <ReferralGroup /> },
    ];
    return <CustomTabView tabs={tabs} />;
}
