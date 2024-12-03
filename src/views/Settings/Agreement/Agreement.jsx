import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import AgrementTemplate from './AgreementTemplate/AgrementTemplate';
import AgreementCategories from './AgreementCategories/AgreementCategories';
import AssessedFees from './AssessedFees/AssessedFees';
import AgreementPromotions from './AgreementPromotions/AgreementPromotions';
import AgreementPlan from './AgreementPlan/AgreementPlan';

export default function Agreement() {
    const tabs = [
        { title: 'Assessed Fees', content: <AssessedFees /> },
        { title: 'Agreement Template', content: <AgrementTemplate /> },
        { title: 'Agreement Plan', content: <AgreementPlan /> },
        { title: 'Agreement Categories', content: <AgreementCategories /> },
        { title: 'Agreement Promotions', content: <AgreementPromotions /> },
    ];
    return <CustomTabView tabs={tabs} />;
}
