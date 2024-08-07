import React from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import { useParams } from 'react-router-dom';
import EventGeneral from './EventGeneral';
import EventServices from './EventServices';
import DisplayOptions from './DisplayOptions';
import Online from './Online';
import Notifications from './Notifications';

const EventsForm = () => {
    const { id } = useParams();
    const tabs = [
        { title: 'General', content: <EventGeneral /> },
        { title: 'Services', content: <EventServices /> },
        { title: 'Display Options', content: <DisplayOptions /> },
        { title: 'Online', content: <Online /> },
        { title: 'Notifications', content: <Notifications /> },
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
