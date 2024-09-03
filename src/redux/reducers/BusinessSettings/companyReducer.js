import { types } from '../../types/types';
const intitalState = {
    allCompany: [],
};

const companyReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_COMPANY:
            return {
                ...state,
                allCompany: action.payload,
            };
        default:
            return { ...state };
    }
};

export default companyReducer;
