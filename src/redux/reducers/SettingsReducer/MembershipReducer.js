import { types } from '../../types/types';
const intitalState = {
    membershipTypes: [],
    membershipTypesDropdown: [],
};

const MembershipReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.MEMBER_SETUP.MEMEBERSHIP_TYPE:
            return {
                ...state,
                membershipTypes: action.payload,
                membershipTypesDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default MembershipReducer;
