import { types } from "../types/types";
const intitalState = {
    classSchedules: []
};

const classScheduelsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CLASS_SCHEDULES:
            return {
                ...state,
                classSchedules: action.payload,
            };
        default:
            return { ...state };
    }
};
export default classScheduelsReducer;