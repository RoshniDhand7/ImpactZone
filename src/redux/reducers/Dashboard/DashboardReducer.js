import { types } from '../../types/types';
const intitalState = {
    allDashboard: [],
};

const dashboardReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_DASHBOARD:
            return {
                ...state,
                allDashboard: action.payload,
            };
        default:
            return { ...state };
    }
};

export default dashboardReducer;
