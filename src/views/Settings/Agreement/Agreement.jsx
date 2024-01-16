import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import AgrementTemplate from './AgreementTemplate/AgrementTemplate';

export default function Agreement() {
    const tabs = [
        { title: 'Assessed Fees', content: <>h1</> },
        { title: 'Agreement Template', content: <AgrementTemplate /> },
        { title: 'Membership Plan', content: <>h1</> },
        { title: 'Agreement Categories', content: <>h1</> },
        { title: 'Agreement Promotions', content: <>h1</> },
    ];
    return <CustomTabView tabs={tabs} />;
}
