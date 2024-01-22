import { types } from '../../types/types';
const intitalState = {
    allLocationType: [],
};

const locationTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_LOCATION_TYPE:
            return {
                ...state,
                allLocationType: action.payload,
            };

        default:
            return { ...state };
    }
};

export default locationTypeReducer;
