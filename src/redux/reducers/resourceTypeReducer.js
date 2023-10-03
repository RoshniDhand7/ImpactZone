import { types } from "../types/types";
const intitalState = {
    resourceType: [],
    allResourceType:[],
};

const resourceTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ADD_RESOURCETYPE:
            return {
                ...state,
                resourceType: action.payload,
            }
        case types.ALL_RESOURCE_TYPE:
            return {
                ...state,
                allResourceType: action.payload,
            }
        default:
            return { ...state };
    }
};
export default resourceTypeReducer;