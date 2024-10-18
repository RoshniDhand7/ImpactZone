import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import ManageEmployee from './ManageEmployee/ManageEmployee';
import SecurityRoles from './SecurityRoles/SecurityRoles';
import Departments from './Departments/Departments';
import TimeSheet from './Timesheet/Timesheet';
import Availability from './Availability/Availability';

export default function Employees() {
    const tabs = [
        { title: 'Manage Employee', content: <ManageEmployee /> },
        { title: 'Availability', content: <Availability /> },
        { title: 'Timesheets', content: <TimeSheet /> },
        { title: 'Departments', content: <Departments /> },
        { title: 'Security Roles', content: <SecurityRoles /> },
        { title: 'Report Security', content: <h1>Report Security</h1> },
    ];
    return <CustomTabView tabs={tabs} />;
}
