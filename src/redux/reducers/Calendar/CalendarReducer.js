import { types } from '../../types/types';

const initialState = {
    events: [],
    locations: [],
    calendarEvents: [],
    calendarLocationDropdown: [],
    calendarEventsDropdown: [],
    bookedEvents: [],
    calendarEvent: [],
};

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CALENDAR.EVENTS:
            return { ...state, events: action.payload, calendarEventsDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })) };
        case types.CALENDAR.LOCATIONS:
            return { ...state, locations: action.payload, calendarLocationDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })) };
        case types.CALENDAR.CLASSES:
            return { ...state, calendarEvents: action.payload };
        case types.CALENDAR.BOOK_EVENTS:
            return { ...state, bookedEvents: action.payload };
        case types.CALENDAR.RESOURCES:
            return { ...state, calendarResourcesDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })) };
        case types.CALENDAR.BOOK_EVENT:
            return { ...state, calendarEvent: action.payload };
        default:
            return { ...state };
    }
};

export default calendarReducer;
