import { types } from '../../types/types';
const intitalState = {
    allEvents: [],
};

const eventReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_SCHEDULE_EVENTS:
            return {
                ...state,
                allEvents: action.payload,
            };

        default:
            return { ...state };
    }
};

export default eventReducer;
