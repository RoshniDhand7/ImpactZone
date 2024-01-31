import { types } from '../../types/types';
const intitalState = {
    allAgreementCategories: [],
};

const agreementCategoriesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_AGREEMENT_CATEGORY:
            return {
                ...state,
                allAgreementCategories: action.payload,
            };
        default:
            return { ...state };
    }
};

export default agreementCategoriesReducer;
