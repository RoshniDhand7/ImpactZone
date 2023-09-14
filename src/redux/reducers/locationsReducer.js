import { types } from "../types/types";
const intitalState = {
    locationTypes: [],
    locations: []
};

const locationsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.LOCATION_TYPES:
            return {
                ...state,
                locationTypes: action.payload,
            };
        case types.LOCATIONS:
            return {
                ...state,
                locations: action.payload,
            };
        default:
            return { ...state };
    }
};
export default locationsReducer;