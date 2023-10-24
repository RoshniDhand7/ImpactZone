import { types } from "../types/types";
const intitalState = {
    membershipPlans: [],
};

const membershipPlansReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.MEMBERSHIP_PLANS:
            return {
                ...state,
                membershipPlans: action.payload,
            };
        default:
            return { ...state };
    }
};
export default membershipPlansReducer;