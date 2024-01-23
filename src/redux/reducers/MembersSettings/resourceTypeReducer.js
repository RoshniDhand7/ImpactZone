import { types } from '../../types/types';
const intitalState = {
    allResourceType: [],
};

const resourceTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_RESOURCE_TYPE:
            return {
                ...state,
                allResourceType: action.payload,
            };

        default:
            return { ...state };
    }
};

export default resourceTypeReducer;
