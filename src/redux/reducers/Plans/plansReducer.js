import { types } from '../../types/types';
const intitalState = {
    active: [],
    allDrafts: [],
};

const plansReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.PLANS.ACTIVE:
            return {
                ...state,
                active: action.payload,
            };
        case types.PLANS.DRAFT:
            return {
                ...state,
                allDrafts: action.payload,
            };

        default:
            return { ...state };
    }
};

export default plansReducer;
