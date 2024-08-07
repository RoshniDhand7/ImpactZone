import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import AgrementTemplate from './AgreementTemplate/AgrementTemplate';
import AgreementCategories from './AgreementCategories/AgreementCategories';
import AssessedFees from './AssessedFees/AssessedFees';
import MembershipPlan from './MembershipPlan/MembershipPlan';
import AgreementPromotions from './AgreementPromotions/AgreementPromotions';

export default function Agreement() {
    const tabs = [
        { title: 'Assessed Fees', content: <AssessedFees /> },
        { title: 'Agreement Template', content: <AgrementTemplate /> },
        { title: 'Agreement Plan', content: <MembershipPlan /> },
        { title: 'Agreement Categories', content: <AgreementCategories /> },
        { title: 'Agreement Promotions', content: <AgreementPromotions /> },
    ];
    return <CustomTabView tabs={tabs} />;
}
