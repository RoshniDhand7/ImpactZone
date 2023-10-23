import { types } from "../types/types";
const intitalState = {
    AllAgreementCategory: [],
};

const agreementCategoryReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_AGREEMENTCATEGORY:
            return {
                ...state,
                AllAgreementCategory: action.payload,
            };
        default:
            return { ...state };
    }
};
export default agreementCategoryReducer;