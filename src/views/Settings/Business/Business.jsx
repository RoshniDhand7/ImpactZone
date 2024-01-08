import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import Company from './Company/Company';
import ReasonCode from './ReasonCode/ReasonCode';
import Customization from './Customization/Customization';
import Clubs from './Clubs/Clubs';
import JobTitle from './JobTitle/JobTitle';

export default function Business() {
    const tabs = [
        { title: 'Company', content: <Company /> },
        { title: 'Reason Code', content: <ReasonCode /> },
        // { title: 'Cancel Code', content: <h1>Tab3</h1> },
        { title: 'Customization', content: <Customization /> },
        { title: 'Clubs', content: <Clubs /> },
        { title: 'Job Title', content: <JobTitle /> },
    ];
    return <CustomTabView tabs={tabs} />;
}
