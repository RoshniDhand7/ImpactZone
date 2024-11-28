import { types } from '../../types/types';
const intitalState = {
    members: [],
    allMembersDropdown: [],
    member: {},
};

const membersPortalReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_MEMBER_DATA:
            return {
                ...state,
                [action.payload.key]: action.payload.data,
            };
        case types.RESET_MEMBER_DATA: {
            return {};
        }
        case types.CHANGE_MEMBERS: {
            return {
                ...state,
                members: action.payload,
                allMembersDropdown: action.payload.map((item) => ({ name: item.firstName, value: item._id })),
            };
        }
        case types.CHANGE_VIEW_MEMBERS:
            return {
                ...state,
                member: action.payload,
            };
        default:
            return { ...state };
    }
};

export default membersPortalReducer;
