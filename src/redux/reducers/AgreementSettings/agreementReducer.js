import { types } from '../../types/types';
const intitalState = {
    allAgreementCategories: [],
    allAgreementTemplates: [],
    agreementCategoryDropdown: [],
    agreementSubCategoryDropdown: [],
    allAgreementTemplatesDropdown: [],
};

const agreementReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_AGREEMENT_CATEGORY:
            return {
                ...state,
                allAgreementCategories: action.payload,
                agreementCategoryDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })),
                agreementSubCategoryDropdown: action.payload?.flatMap((item) => item?.subCategories)?.map((item) => ({ name: item, value: item })),
            };
        case types.CHANGE_AGREEMENT_TEMPLATE:
            return {
                ...state,
                allAgreementTemplates: action.payload,
                allAgreementTemplatesDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default agreementReducer;
