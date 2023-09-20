import { types } from "../types/types";
const intitalState = {
    events: [],
    eventsByType: []
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
        default:
            return { ...state };
    }
};
export default eventsReducer;