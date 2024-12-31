import { types } from '../../types/types';

const initialState = {
    events: [],
    locations: [],
};

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CALENDAR.EVENTS:
            return { ...state, events: action.payload };
        case types.CALENDAR.LOCATIONS:
            return { ...state, locations: action.payload };
        default:
            return { ...state };
    }
};

export default calendarReducer;
