import { types } from '../../types/types';
const intitalState = {
    allCompaignGroups: [],
};

const comapignGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_COMPAIGNS_GROUP:
            return {
                ...state,
                allCompaignGroups: action.payload,
            };

        default:
            return { ...state };
    }
};

export default comapignGroupReducer;
