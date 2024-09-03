import { types } from '../../types/types';
const intitalState = {
    allResources: [],
};

const resourcesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_RESOURCES:
            return {
                ...state,
                allResources: action.payload,
            };

        default:
            return { ...state };
    }
};

export default resourcesReducer;
