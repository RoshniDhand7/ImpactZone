import { types } from '../../types/types';
const intitalState = {
    allAccessSchedule: [],
    AccessScheduleDropdown: [],
};

const accessScheduleReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_ACCESS_SCHEDULE:
            return {
                ...state,
                allAccessSchedule: action.payload,
                AccessScheduleDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default accessScheduleReducer;
