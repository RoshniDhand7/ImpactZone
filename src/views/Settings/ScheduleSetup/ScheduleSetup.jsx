import React from 'react';
import CustomTabView from '../../../shared/TabView/CustomTabView';
import Level from './Level/Level';
import LocationType from './LocationType/LocationType';
import Locations from './Locations/Locations';
import EventSetup from './EventSetup/EventSetup';
import EventCategories from './EventCategories/EventCategories';
import EventClasses from './EventClasses/EventClasses';

const ScheduleSetup = () => {
    const tabs = [
        { title: 'Levels', content: <Level /> },
        { title: 'Location Types', content: <LocationType /> },
        { title: 'Locations', content: <Locations /> },
        { title: 'Events Setups', content: <EventSetup /> },
        { title: 'Event Categories', content: <EventCategories /> },
        { title: 'Classes', content: <></> },
    ];
    return <CustomTabView tabs={tabs} />;
};

export default ScheduleSetup;
