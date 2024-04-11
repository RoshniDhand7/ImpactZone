import React from 'react';
import FormPage from '../../../../../shared/Layout/FormPage';
import CustomTabView from '../../../../../shared/TabView/CustomTabView';
import Security from './Security';
import General from './General';
import Clubs from './Clubs';
import Notes from './Notes';
import Certifications from './Certifications/Certifications';
import { useParams } from 'react-router-dom';
import EmployeeDepartments from './EmployeeDepartments';
import ClassesSetup from './Classes/ClassesSetup';
import AppointmentSetup from './AppointmentSetup/AppointmentSetup';
import SalesCommission from './SalesCommission/SalesCommission';

const EmployeeForm = () => {
    const { id } = useParams();
    const tabs = [
        { title: 'Security', content: <Security /> },
        { title: 'General', content: <General /> },
        { title: 'Departments', content: <EmployeeDepartments /> },
        { title: 'Clubs', content: <Clubs /> },
        { title: 'Classes Setup', content: <ClassesSetup /> },
        { title: 'Appointment Setup', content: <AppointmentSetup /> },
        { title: 'Sales Commision', content: <SalesCommission /> },
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
                <CustomTabView tabs={tabs} disabledTabIndices={id ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9]} scrollable={true} />
            </FormPage>
        </>
    );
};

export default EmployeeForm;
