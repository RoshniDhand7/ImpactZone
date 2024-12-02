import { types } from '../../types/types';
const intitalState = {
    assessedFees: [],
    assessedFeesDropdown: [],
    agreementTemplates: [],
    agreementPlans: [],
    agreementCategories: [],
    agreementPromotions: [],
};

const AgreementReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.AGREEMENT_SETUP.ASSESSED_FEE:
            return {
                ...state,
                assessedFees: action.payload,
                assessedFeesDropdown: action.payload.map((item) => ({
                    name: `${item.name} ($${item.amount} ${item.type}) (${item.recurring ? 'Recurring' : 'One Time'})`,
                    value: item._id,
                })),
            };
        case types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_TEMPLATE:
            return {
                ...state,
                agreementTemplates: action.payload,
            };
        case types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PLAN:
            return {
                ...state,
                agreementPlans: action.payload,
            };
        case types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_CATEGORY:
            return {
                ...state,
                agreementCategories: action.payload,
            };
        case types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PROMOTION:
            return {
                ...state,
                agreementPromotions: action.payload,
            };

        default:
            return { ...state };
    }
};

export default AgreementReducer;
