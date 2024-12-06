import { types } from '../../types/types';
const intitalState = {
    members: [],
    allMembersDropdown: [],
    member: {},
    agreement: [],
    services: [],
    checkIn: [],
    notes: [],
};

const membersPortalReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.MEMBER.MEMBER_DATA:
            return {
                ...state,
                [action.payload.key]: action.payload.data,
            };
        case types.MEMBER.RESET_MEMBER_DATA: {
            return intitalState;
        }
        case types.MEMBER.MEMBER: {
            return {
                ...state,
                members: action.payload,
                allMembersDropdown: action.payload.map((item) => ({ name: item.firstName, value: item._id })),
            };
        }
        case types.MEMBER.VIEW_MEMBER:
            return {
                ...state,
                member: action.payload,
            };
        case types.MEMBER.SERVICES:
            return {
                ...state,
                services: action.payload,
            };
        case types.MEMBER.AGREEMENT:
            return {
                ...state,
                agreement: action.payload,
            };
        case types.MEMBER.DOCUMENTS:
            return {
                ...state,
                documents: action.payload,
            };
        case types.MEMBER.CHECK_IN:
            return {
                ...state,
                checkIn: action.payload,
            };
        case types.MEMBER.NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        default:
            return { ...state };
    }
};

export default membersPortalReducer;
