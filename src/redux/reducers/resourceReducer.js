import { types } from "../types/types";
const intitalState = {
    allResource:[],
};

const resourceReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_RESOURCES:
            return {
                ...state,
                allResource: action.payload,
            }
        default:
            return { ...state };
    }
};
export default resourceReducer;