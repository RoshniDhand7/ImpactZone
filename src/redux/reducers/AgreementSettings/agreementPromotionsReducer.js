import { types } from '../../types/types';
const intitalState = {
    allAgreementPromotion: [],
    allAgreementPromotionDropdown: [],
};

const agreementPromotionReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_AGREEMENT_PROMOTION:
            return {
                ...state,
                allAgreementPromotion: action.payload,
                allAgreementPromotionDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default agreementPromotionReducer;
