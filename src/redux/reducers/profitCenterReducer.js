import { types } from "../types/types";
const intitalState = {
    allProfitCenter: [],
};

const ProfitCenterReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_PROFIT_CENTER:
            return {
                ...state,
                allProfitCenter: action.payload,
            }
        default:
            return { ...state };
    }
};
export default ProfitCenterReducer;