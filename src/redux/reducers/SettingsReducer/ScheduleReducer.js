import { types } from '../../types/types';
const intitalState = {
    levels: [],
    levelDropdown: [],
    locationType: [],
    locationTypeDropdown: [],
    location: [],
    locationDropdown: [],
    events: [],
    eventsDropDown: [],
    servicesEvents: [],
    servicesEventsLevels: [],
    eventClassesDropDown: [],
    eventAppointmentDropdown: [],
    eventCategories: [],
    classes: [],
    schedulingOptions: [],
    eventAppointmentDropDown: [],
    eventClasses: [],
};

const scheduleReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.SCHEDULE_SETUP.LEVEL:
            return {
                ...state,
                levels: action.payload,
                levelDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ value: item._id, name: item.name })),
            };
        case types.SETTINGS.SCHEDULE_SETUP.LOCATION_TYPE:
            return {
                ...state,
                locationType: action.payload,
                locationTypeDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.SETTINGS.SCHEDULE_SETUP.LOCATION:
            return {
                ...state,
                location: action.payload,
                locationDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.SETTINGS.SCHEDULE_SETUP.EVENT_SETUP:
            return {
                ...state,
                events: action.payload,
                eventClasses: action.payload.filter((item) => item.eventType === 'CLASS' && item.isActive),
                eventsDropDown: action.payload.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
                eventClassesDropDown: action.payload
                    .filter((item) => item.eventType === 'CLASS' && item.isActive)
                    .map((item) => ({ name: item.name, value: item._id })),
                eventAppointmentDropDown: action.payload
                    .filter((item) => item.eventType === 'APPOINTMENTS' && item.isActive)
                    .map((item) => ({ name: item.name, value: item._id })),
            };
        case types.SETTINGS.SCHEDULE_SETUP.SCHEDULE_EVENTS_LEVEL:
            return {
                ...state,
                servicesEvents: action.payload,
                servicesEventsLevels: action.payload.EventService?.map((item) => item?.eventLevel?.name),
            };
        case types.SETTINGS.SCHEDULE_SETUP.EVENT_CATEGORY:
            return {
                ...state,
                eventCategories: action.payload,
            };
        case types.SETTINGS.SCHEDULE_SETUP.CLASSES:
            return {
                ...state,
                classes: action.payload,
            };
        case types.SETTINGS.SCHEDULE_SETUP.SCHEDULE_OPTION:
            return {
                ...state,
                schedulingOptions: action.payload,
            };

        default:
            return { ...state };
    }
};

export default scheduleReducer;
