import { types } from '../../types/types';
const intitalState = {
    allReasonCode: [],
    noSaleReasons: [],
};

const reasonCodeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_REASON_CODE:
            return {
                ...state,
                allReasonCode: action.payload,
            };
        case types.POS.NO_SALE_REASON_CODE:
            return {
                ...state,
                noSaleReasons: action.payload,
            };
        default:
            return { ...state };
    }
};

export default reasonCodeReducer;
