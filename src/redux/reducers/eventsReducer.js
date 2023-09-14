import { types } from "../types/types";
const intitalState = {
    eventsByType: []
};

const eventsReducer = (state = intitalState, action) => {
    switch (action.type) {
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