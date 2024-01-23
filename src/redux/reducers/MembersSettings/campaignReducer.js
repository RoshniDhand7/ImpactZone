import { types } from '../../types/types';
const intitalState = {
    allCompaigns: [],
};

const camapignReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_COMPAIGNS:
            return {
                ...state,
                allCompaigns: action.payload,
            };

        default:
            return { ...state };
    }
};

export default camapignReducer;
