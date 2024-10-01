import { lazy } from 'react';

import AddandEditServices from '../../views/Settings/ScheduleSetup/EventSetup/AddandEditServices';
import SchedulingOptionsForm from '../../views/Settings/ScheduleSetup/SchedulingOptionsForm';
const LevelForm = lazy(() => import('../../views/Settings/ScheduleSetup/Level/LevelForm'));
const LocationsForm = lazy(() => import('../../views/Settings/ScheduleSetup/Locations/LocationsForm'));
const LocationTypeForm = lazy(() => import('../../views/Settings/ScheduleSetup/LocationType/LocationTypeForm'));
const EventClassesForm = lazy(() => import('../../views/Settings/ScheduleSetup/EventClasses/EventClassesForm'));
const EventCategoriesForm = lazy(() => import('../../views/Settings/ScheduleSetup/EventCategories/EventCategoriesForm'));
const EventsForm = lazy(() => import('../../views/Settings/ScheduleSetup/EventSetup/EventsForm'));
const ScheduleSettingRoutes = [
    {
        path: '/levels/add',
        name: 'Schedule',
        exact: true,
        component: LevelForm,
    },
    {
        path: '/levels/edit/:id',
        name: 'Business',
        exact: true,
        component: LevelForm,
    },
    {
        path: '/levels/scheduling/',
        name: 'Scheduling',
        exact: true,
        component: SchedulingOptionsForm,
    },
    {
        path: '/location-type/add',
        name: 'Schedule',
        exact: true,
        component: LocationTypeForm,
    },
    {
        path: '/location-type/edit/:id',
        name: 'Schedule',
        exact: true,
        component: LocationTypeForm,
    },
    {
        path: '/locations/add',
        name: 'Schedule',
        exact: true,
        component: LocationsForm,
    },
    {
        path: '/locations/edit/:id',
        name: 'Schedule',
        exact: true,
        component: LocationsForm,
    },
    {
        path: '/events/add',
        name: 'Schedule',
        exact: true,
        component: EventsForm,
    },
    {
        path: '/events/edit/:id',
        name: 'Schedule',
        exact: true,
        component: EventsForm,
        items: [
            { path: '/services/add', name: 'Services', component: AddandEditServices },
            { path: '/services/edit/:eventId', name: 'Services', component: AddandEditServices },
        ],
    },
    {
        path: '/event-categories/add',
        name: 'Schedule',
        exact: true,
        component: EventCategoriesForm,
    },
    {
        path: '/event-categories/edit/:id',
        name: 'Schedule',
        exact: true,
        component: EventCategoriesForm,
    },
    {
        path: '/classes/add',
        name: 'Schedule',
        exact: true,
        component: EventClassesForm,
    },
    {
        path: '/classes/edit/:id',
        name: 'Schedule',
        exact: true,
        component: EventClassesForm,
    },
];
export default ScheduleSettingRoutes;
