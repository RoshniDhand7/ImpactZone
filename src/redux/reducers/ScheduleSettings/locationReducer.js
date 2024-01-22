import { types } from '../../types/types';
const intitalState = {
    allLocations: [],
};

const locationsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_LOCATIONS:
            return {
                ...state,
                allLocations: action.payload,
            };

        default:
            return { ...state };
    }
};

export default locationsReducer;
