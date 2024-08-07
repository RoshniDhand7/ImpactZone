import { types } from '../../types/types';
const intitalState = {
    allSchedulingOptions: [],
};

const schedulingOptionsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_SCHEDULING_OPTIONS:
            return {
                ...state,
                allSchedulingOptions: action.payload,
            };

        default:
            return { ...state };
    }
};

export default schedulingOptionsReducer;
