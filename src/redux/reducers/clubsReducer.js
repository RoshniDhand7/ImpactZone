import { types } from "../types/types";
const intitalState = {
    clubs: []
};

const locationsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CLUBS:
            return {
                ...state,
                clubs: action.payload,
            };
        default:
            return { ...state };
    }
};
export default locationsReducer;