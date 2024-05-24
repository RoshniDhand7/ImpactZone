import { types } from '../../types/types';
const intitalState = {
    allMembers: [],
};

const memberReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_MEMBERS:
            return {
                ...state,
                allMembers: action.payload,
            };
        default:
            return { ...state };
    }
};

export default memberReducer;
