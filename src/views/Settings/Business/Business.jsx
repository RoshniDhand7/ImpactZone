import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import Company from './Company/Company';
import ReasonCode from './ReasonCode/ReasonCode';
import Customization from './Customization/Customization';
import Clubs from './Clubs/Clubs';
import JobTitle from './JobTitle/JobTitle';
import DefaultSettings from './Default/DefaultSettings';

export default function Business() {
    const tabs = [
        { title: 'Company', content: <Company /> },
        { title: 'Reason Code', content: <ReasonCode /> },
        { title: 'Customization', content: <Customization /> },
        { title: 'Clubs', content: <Clubs /> },
        { title: 'Job Title', content: <JobTitle /> },
        { title: 'Default', content: <DefaultSettings /> },
    ];
    return <CustomTabView tabs={tabs} />;
}
