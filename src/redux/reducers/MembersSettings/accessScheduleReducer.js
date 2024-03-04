import { types } from '../../types/types';
const intitalState = {
    allAccessSchedule: [],
};

const accessScheduleReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_ACCESS_SCHEDULE:
            return {
                ...state,
                allAccessSchedule: action.payload,
            };

        default:
            return { ...state };
    }
};

export default accessScheduleReducer;
