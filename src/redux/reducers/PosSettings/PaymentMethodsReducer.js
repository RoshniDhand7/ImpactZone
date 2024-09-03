import { types } from '../../types/types';
const intitalState = {
    allPaymentMethod: [],
};

const paymentMethodReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_PAYMENT_METHODS:
            return {
                ...state,
                allPaymentMethod: action.payload,
            };

        default:
            return { ...state };
    }
};

export default paymentMethodReducer;
