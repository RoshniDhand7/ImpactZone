import { types } from '../../types/types';
const intitalState = {
    allMembershipTypes: [],
};

const membershipTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_MEMBERSHIP_TYPES:
            return {
                ...state,
                allMembershipTypes: action.payload,
            };

        default:
            return { ...state };
    }
};

export default membershipTypeReducer;
