import { types } from '../../types/types';
const intitalState = {
    levels: [],
    levelDropdown: [],
    locationType: [],
    locationTypeDropdown: [],
    location: [],
    locationDropdown: [],
};

const scheduleReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.SCHEDULE_SETUP.LEVEL:
            return {
                ...state,
                levels: action.payload,
                levelDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ value: item._id, name: item.name })),
            };
        case types.SETTINGS.SCHEDULE_SETUP.LOCATION_TYPE:
            return {
                ...state,
                locationType: action.payload,
                locationTypeDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.SETTINGS.SCHEDULE_SETUP.LOCATION:
            return {
                ...state,
                location: action.payload,
                locationDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default scheduleReducer;
