import { types } from "../types/types";
const intitalState = {
    membershipType: [],
};

const memberShipTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_MEMBERSHIP_TYPE:
            return {
                ...state,
                membershipType: action.payload,
            }
        default:
            return { ...state };
    }
};
export default memberShipTypeReducer;