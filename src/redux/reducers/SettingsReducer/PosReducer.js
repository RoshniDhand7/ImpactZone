import { types } from '../../types/types';
const intitalState = {
    taxes: [],
    paymentMethods: [],
    discounts: [],
    registers: [],
};

const PosReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.POS.TAX:
            return {
                ...state,
                taxes: action.payload,
            };
        case types.SETTINGS.POS.PAYMENT_METHOD:
            return {
                ...state,
                paymentMethods: action.payload,
            };
        case types.SETTINGS.POS.DISCOUNT:
            return {
                ...state,
                discounts: action.payload,
            };
        case types.SETTINGS.POS.REGISTER:
            return {
                ...state,
                registers: action.payload,
            };

        default:
            return { ...state };
    }
};

export default PosReducer;
