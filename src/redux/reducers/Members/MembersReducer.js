import { types } from '../../types/types';
const intitalState = {};

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
        default:
            return { ...state };
    }
};

export default membersPortalReducer;
