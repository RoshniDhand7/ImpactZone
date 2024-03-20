import React from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import { useParams } from 'react-router-dom';
import EventGeneral from './EventGeneral';

const EventsForm = () => {
    const { id } = useParams();
    const tabs = [
        { title: 'General', content: <EventGeneral /> },
        { title: 'Services', content: <></> },
        { title: 'Display Options', content: <></> },
        { title: 'Online', content: <></> },
        { title: 'Notifications', content: <></> },
    ];
    return (
        <>
            <FormPage backText="Events Setups">
                <CustomTabView tabs={tabs} disabledTabIndices={id ? [] : [1, 2, 3, 4]} />
            </FormPage>
        </>
    );
};

export default EventsForm;
