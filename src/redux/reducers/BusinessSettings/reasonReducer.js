import { types } from '../../types/types';
const intitalState = {
    allReasonCode: [],
};

const reasonCodeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_REASON_CODE:
            return {
                ...state,
                allReasonCode: action.payload,
            };
        default:
            return { ...state };
    }
};

export default reasonCodeReducer;
