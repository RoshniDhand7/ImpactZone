import { types } from "../types/types";
const intitalState = {
    levels: [],
};

const levelReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.LEVELS:
            return {
                ...state,
                levels: action.payload,
            };
        default:
            return { ...state };
    }
};
export default levelReducer;