import { types } from '../../types/types';
const intitalState = {
    allDrafts: [],
};

const sellPlanReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_DRAFTS:
            return {
                ...state,
                allDrafts: action.payload,
            };

        default:
            return { ...state };
    }
};

export default sellPlanReducer;
