import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import AgrementTemplate from './AgreementTemplate/AgrementTemplate';
import AgreementCategories from './AgreementCategories/AgreementCategories';
import AssessedFees from './AssessedFees/AssessedFees';

export default function Agreement() {
    const tabs = [
        { title: 'Assessed Fees', content: <AssessedFees /> },
        { title: 'Agreement Template', content: <AgrementTemplate /> },
        { title: 'Membership Plan', content: <>h1</> },
        { title: 'Agreement Categories', content: <AgreementCategories /> },
        { title: 'Agreement Promotions', content: <>h1</> },
    ];
    return <CustomTabView tabs={tabs} />;
}
