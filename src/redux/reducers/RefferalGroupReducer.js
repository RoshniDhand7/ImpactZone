import { types } from "../types/types";
const intitalState = {
    allRefferalGroup: [],
};

const RefferalGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_REFFERAL_GROUP:
            return {
                ...state,
                allRefferalGroup: action.payload,
            }
        default:
            return { ...state };
    }
};
export default RefferalGroupReducer;