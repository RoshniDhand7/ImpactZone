import { types } from '../../types/types';
const intitalState = {
    allMembershipPlan: [],
    allMembershipPlanDropdown: [],
    allMembershipPlanFilter: [],
};

const membershipPlanReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_MEMBERSHIP_PLAN:
            return {
                ...state,
                allMembershipPlan: action.payload,
                allMembershipPlanDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })),
                allMembershipPlanFilter: action.payload?.map((item) => ({
                    name: item.name,
                    _id: item._id,
                    category: item.category,
                    noOfMembers: item.noOfMembers,
                })),
            };
        default:
            return { ...state };
    }
};

export default membershipPlanReducer;
