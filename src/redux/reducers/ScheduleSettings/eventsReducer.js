import { types } from '../../types/types';
const intitalState = {
    allEvents: [],
    allEventsDropDown: [],
    allServicesEvents: [],
    allServicesEventsLevels: [],
    allEventClassesDropDown: [],
    allEventAppointmentDropdown: [],
};

const eventReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_SCHEDULE_EVENTS:
            return {
                ...state,
                allEvents: action.payload,
                allEventClasses: action.payload.filter((item) => item.eventType === 'Class' && item.isActive),
                allEventsDropDown: action.payload.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
                allEventClassesDropDown: action.payload
                    .filter((item) => item.eventType === 'Class' && item.isActive)
                    .map((item) => ({ name: item.name, value: item._id })),
                allEventAppointmentDropDown: action.payload
                    .filter((item) => item.eventType === 'Appointments' && item.isActive)
                    .map((item) => ({ name: item.name, value: item._id })),
            };
        case types.CHANGE_SCHEDULE_SERVICES_EVENTS:
            return {
                ...state,
                allServicesEvents: action.payload,
                allServicesEventsLevels: action.payload.EventService?.map((item) => item?.eventLevel?.name),
            };

        default:
            return { ...state };
    }
};

export default eventReducer;
