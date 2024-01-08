import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import Company from './Company/Company';
import ReasonCode from './ReasonCode/ReasonCode';

export default function Business() {
  const tabs = [
    { title: 'Company', content: <Company /> },
    { title: 'Reason Code', content: <ReasonCode /> },
    { title: 'Cancel Code', content: <h1>Tab3</h1> },
    { title: 'Customization', content: <h1>Tab4</h1> },
    { title: 'Clubs', content: <h1>Tab5</h1> },
    { title: 'Job Title', content: <h1>Tab5</h1> },
  ];
  return <CustomTabView tabs={tabs} />;
}
