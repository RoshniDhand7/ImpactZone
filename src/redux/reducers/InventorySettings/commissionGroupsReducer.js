import { types } from '../../types/types';
const intitalState = {
    allCommissionGroups: [],
    commissionGroupsDropdown: [],
};

const commissionGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_COMMISSION_GROUPS:
            return {
                ...state,
                allCommissionGroups: action.payload,
                commissionGroupsDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default commissionGroupReducer;
