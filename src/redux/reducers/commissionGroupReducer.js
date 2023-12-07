import { types } from "../types/types";
const intitalState = {
    allCommissionGroup: [],
};

const CommissionGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_COMMISSION_GROUP:
            return {
                ...state,
                allCommissionGroup: action.payload,
            }
        default:
            return { ...state };
    }
};
export default CommissionGroupReducer;