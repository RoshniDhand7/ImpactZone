import { types } from '../../types/types';
const intitalState = {
    allLocationType: [],
    locationTypeDropdown: [],
};

const locationTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_LOCATION_TYPE:
            return {
                ...state,
                allLocationType: action.payload,
                locationTypeDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default locationTypeReducer;
