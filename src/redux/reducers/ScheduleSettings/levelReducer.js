import { types } from '../../types/types';
const intitalState = {
    allLevels: [],
};

const levelReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_LEVELS:
            return {
                ...state,
                allLevels: action.payload,
            };

        default:
            return { ...state };
    }
};

export default levelReducer;
