import { types } from '../../types/types';
const intitalState = {
    allMembershipTypes: [],
    MembershipTypesDropdown: [],
};

const membershipTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_MEMBERSHIP_TYPES:
            return {
                ...state,
                allMembershipTypes: action.payload,
                MembershipTypesDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default membershipTypeReducer;
