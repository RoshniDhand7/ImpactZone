import { types } from '../../types/types';
const intitalState = {
    allPOSPromo: [],
};

const PosReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_PROMO_CODE:
            return {
                ...state,
                allPOSPromo: action.payload,
            };
            case types.CLEAR_POS_PROMO:
                return {
                    ...state,
                    allPOSPromo: [], 
                };

        default:
            return { ...state };
    }
};

export default PosReducer;
