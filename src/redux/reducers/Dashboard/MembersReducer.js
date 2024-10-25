import { types } from '../../types/types';
const intitalState = {
    allMembers: [],
    getMember: {},
    allMembersDropdown: [],
};

const memberReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_MEMBERS:
            return {
                ...state,
                allMembers: action.payload,
                allMembersDropdown: action.payload.map((item) => ({ name: item.firstName, value: item._id })),
            };
        case types.CHANGE_VIEW_MEMBERS:
            return {
                ...state,
                getMember: action.payload,
            };
        default:
            return { ...state };
    }
};

export default memberReducer;
