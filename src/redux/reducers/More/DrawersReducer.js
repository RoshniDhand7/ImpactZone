import { types } from '../../types/types';
const intitalState = {
    allDrawers: [],
};

const drawersReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_DRAWERS:
            return {
                ...state,
                allDrawers: action.payload,
            };

        default:
            return { ...state };
    }
};

export default drawersReducer;
