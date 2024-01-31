import { types } from '../../types/types';
const intitalState = {
    allReferralGroups: [],
};

const referralGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_REFERRAL_GROUPS:
            return {
                ...state,
                allReferralGroups: action.payload,
            };
        default:
            return { ...state };
    }
};

export default referralGroupReducer;
