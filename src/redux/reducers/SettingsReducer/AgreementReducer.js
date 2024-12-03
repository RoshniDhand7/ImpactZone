import { types } from '../../types/types';
const intitalState = {
    assessedFees: [],
    assessedFeesDropdown: [],
    agreementTemplates: [],
    agreementPlans: [],
    agreementCategories: [],
    agreementPromotions: [],
    agreementTemplatesDropdown: [],
    agreementCategoriesDropdown: [],
    agreementPlanFilter: [],
    agreementPlansDropdown: [],
    agreementPromotionDropdown: [],
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
                agreementTemplatesDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PLAN:
            return {
                ...state,
                agreementPlans: action.payload,
                agreementPlansDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })),
                agreementPlanFilter: action.payload?.map((item) => ({
                    name: item.name,
                    _id: item._id,
                    category: item.category,
                    noOfMembers: item.noOfMembers,
                })),
            };
        case types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_CATEGORY:
            return {
                ...state,
                agreementCategories: action.payload,
                agreementCategoriesDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PROMOTION:
            return {
                ...state,
                agreementPromotions: action.payload,
                agreementPromotionDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default AgreementReducer;
