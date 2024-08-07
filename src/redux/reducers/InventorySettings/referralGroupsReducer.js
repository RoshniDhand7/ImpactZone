import { types } from '../../types/types';
const intitalState = {
    allReferralGroups: [],
    referralGroupDropdown: [],
};

const referralGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_REFERRAL_GROUPS:
            return {
                ...state,
                allReferralGroups: action.payload,
                referralGroupDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default referralGroupReducer;
