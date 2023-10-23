import { types } from "../types/types";
const intitalState = {
    AllAssessed: [],
};

const assessedReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_ASSESSED:
            return {
                ...state,
                AllAssessed: action.payload,
            };
        default:
            return { ...state };
    }
};
export default assessedReducer;