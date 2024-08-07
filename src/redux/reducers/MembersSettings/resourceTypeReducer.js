import { types } from '../../types/types';
const intitalState = {
    allResourceType: [],
    resourceTypeDropdown: [],
};

const resourceTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_RESOURCE_TYPE:
            return {
                ...state,
                allResourceType: action.payload,
                resourceTypeDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default resourceTypeReducer;
