import { types } from '../types/types';

const intitalState = {
    recentSuggesstions: [],
};

const POSReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_RECENT_SUGGESSIONS:
            return {
                ...state,
                recentSuggesstions: action.payload,
            };
        default:
            return { ...state };
    }
};

export default POSReducer;
