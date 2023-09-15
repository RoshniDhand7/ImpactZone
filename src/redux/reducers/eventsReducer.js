import { types } from "../types/types";
const intitalState = {
    events: [],
};

const eventsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.EVENTS:
            return {
                ...state,
                events: action.payload,
            };
        default:
            return { ...state };
    }
};
export default eventsReducer;