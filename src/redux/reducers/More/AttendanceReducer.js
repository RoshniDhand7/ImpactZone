import { types } from '../../types/types';
const intitalState = {
    allAttendanceCheckIn: [],
};

const moreAttendanceReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_ATTENDANCE_CHECK_IN:
            return {
                ...state,
                allAttendanceCheckIn: action.payload,
            };

        default:
            return { ...state };
    }
};

export default moreAttendanceReducer;
