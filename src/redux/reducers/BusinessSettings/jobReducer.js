import { types } from '../../types/types';
const intitalState = {
    allJobTitle: [],
};

const jobTitleReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_JOB_TITLE:
            return {
                ...state,
                allJobTitle: action.payload,
            };
        default:
            return { ...state };
    }
};

export default jobTitleReducer;
