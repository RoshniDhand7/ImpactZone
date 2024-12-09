import { types } from '../../types/types';
const intitalState = {
    getCheckInData: {},
    getCheckInHistory: [],
    recentCheckIn: [],
    resourceList: [],
    task: [],
};

const checkInReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CHECK_IN:
            return {
                ...state,
                getCheckInData: action.payload,
            };
        case types.CHANGE_RECENT_CHECK_IN:
            return {
                ...state,
                getCheckInHistory: action.payload,
            };
        case types.RECENT_CHECK_IN_MEMBER:
            return {
                ...state,
                recentCheckIn: action.payload,
            };
        case types.CHANGE_RESOURCES_LIST:
            return {
                ...state,
                resourceList: action.payload,
            };
        case types.CHANGE_TASK:
            return {
                ...state,
                task: action.payload,
            };
        default:
            return { ...state };
    }
};

export default checkInReducer;
