import { types } from '../../types/types';
const intitalState = {
    registers: [],
    registersSummary: [],
    savedCarts: [],
    receipts: [],
    categories: [],
    catalogs: [],
    members: [],
};

const POSReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.POS.REGISTER:
            return {
                ...state,
                registers: action.payload,
            };
        case types.POS.REGISTER_SUMMARY:
            return {
                ...state,
                registersSummary: action.payload,
            };
        case types.POS.SAVED_CART:
            return {
                ...state,
                savedCarts: action.payload,
            };
        case types.POS.RECEIPT:
            return {
                ...state,
                receipts: action.payload,
            };
        case types.POS.CATEGORY:
            return {
                ...state,
                categories: action.payload,
            };
        case types.POS.CATELOG:
            return {
                ...state,
                catalogs: action.payload,
            };
        case types.POS.MEMBER:
            return {
                ...state,
                members: action.payload,
            };

        default:
            return { ...state };
    }
};

export default POSReducer;
