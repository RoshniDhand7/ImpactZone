import { types } from '../../types/types';
const intitalState = {
    allLocations: [],
    locationDropdown: [],
};

const locationsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_LOCATIONS:
            return {
                ...state,
                allLocations: action.payload,
                locationDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default locationsReducer;
