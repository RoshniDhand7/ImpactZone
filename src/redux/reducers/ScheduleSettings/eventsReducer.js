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
                allEventsDropDown: action.payload.map((item) => ({ name: item.name, value: item._id })),
                allEventClassesDropDown: action.payload.filter((item) => item.eventType === 'Class').map((item) => ({ name: item.name, value: item._id })),
                allEventAppointmentDropDown: action.payload
                    .filter((item) => item.eventType === 'Appointments')
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
