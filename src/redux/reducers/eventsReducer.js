import { types } from "../types/types";
const intitalState = {
    events: [],
    eventsByType: [],
    eventCategories: []
};

const eventsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.EVENTS:
            return {
                ...state,
                events: action.payload,
            }
        case types.EVENTS_BY_TYPE:
            return {
                ...state,
                eventsByType: action.payload,
            };
        case types.EVENT_CATEGORIES:
            return {
                ...state,
                eventCategories: action.payload,
            };
        default:
            return { ...state };
    }
};
export default eventsReducer;