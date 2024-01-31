import { types } from '../../types/types';
const intitalState = {
    allCommissionGroups: [],
};

const commissionGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_COMMISSION_GROUPS:
            return {
                ...state,
                allCommissionGroups: action.payload,
            };
        default:
            return { ...state };
    }
};

export default commissionGroupReducer;
