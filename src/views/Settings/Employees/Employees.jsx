import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import ManageEmployee from './ManageEmployee/ManageEmployee';
import SecurityRoles from './SecurityRoles/SecurityRoles';

export default function Employees() {
    const tabs = [
        { title: 'Manage Employee', content: <ManageEmployee /> },
        { title: 'Availability', content: <h1>Tab2</h1> },
        { title: 'Timesheets', content: <h1>Tab 3</h1> },
        { title: 'Departments', content: <h1>Tab 4</h1> },
        { title: 'Security Roles', content: <SecurityRoles /> },
        { title: 'Report Security', content: <h1>Tab 6</h1> },
    ];
    return <CustomTabView tabs={tabs} />;
}
