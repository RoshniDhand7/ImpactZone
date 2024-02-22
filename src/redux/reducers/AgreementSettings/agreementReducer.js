import { types } from '../../types/types';
const intitalState = {
    allAgreementCategories: [],
    allAgreementTemplates: [],
};

const agreementReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_AGREEMENT_CATEGORY:
            return {
                ...state,
                allAgreementCategories: action.payload,
            };
        case types.CHANGE_AGREEMENT_TEMPLATE:
            return {
                ...state,
                allAgreementTemplates: action.payload,
            };
        default:
            return { ...state };
    }
};

export default agreementReducer;
