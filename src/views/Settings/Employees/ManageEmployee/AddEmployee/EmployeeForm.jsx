import React from 'react';
import FormPage from '../../../../../shared/Layout/FormPage';
import CustomTabView from '../../../../../shared/TabView/CustomTabView';
import Security from './Security';
import General from './General';
import Clubs from './Clubs';
import Notes from './Notes';
import Certifications from './Certifications/Certifications';

const EmployeeForm = () => {
    const tabs = [
        { title: 'Security', content: <Security /> },
        { title: 'General', content: <General /> },
        { title: 'Departments', content: <h1>Department</h1> },
        { title: 'Clubs', content: <Clubs /> },
        { title: 'Classes Setup', content: <></> },
        { title: 'Appointment Setup', content: <h1>Tab 6</h1> },
        { title: 'Sales Commision', content: <h1>Tab 7</h1> },
        { title: 'Time Sheet', content: <h1>Tab 8</h1> },
        { title: 'Notes', content: <Notes /> },
        {
            title: 'Certifications',
            content: <Certifications />,
        },
    ];
    return (
        <>
            <FormPage backText="Manage Employees" backTo="/settings/employee">
                <CustomTabView tabs={tabs} />
            </FormPage>
        </>
    );
};

export default EmployeeForm;
