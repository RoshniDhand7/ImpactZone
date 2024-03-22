import { types } from '../../types/types';
const intitalState = {
    allEvents: [],
    allServicesEvents: [],
    allServicesEventsLevels: [],
};

const eventReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_SCHEDULE_EVENTS:
            return {
                ...state,
                allEvents: action.payload,
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
