import { types } from "../types/types";
const intitalState = {
    allAgreementPromotions: [],
};

const agreementPromotionsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_AGREEMENT_PROMOTIONS:
            return {
                ...state,
                allAgreementPromotions: action.payload,
            };
        default:
            return { ...state };
    }
};
export default agreementPromotionsReducer;