import { types } from "../types/types";
const intitalState = {
    accessSchedules: [],
};

const accessSchedulesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ACCESS_SCHEDULES:
            return {
                ...state,
                accessSchedules: action.payload,
            }
        default:
            return { ...state };
    }
};
export default accessSchedulesReducer;