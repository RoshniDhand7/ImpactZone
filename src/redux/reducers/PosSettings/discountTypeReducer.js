import { types } from '../../types/types';
const intitalState = {
    allDiscountTypes: [],
    allDiscountDropdown: [],
};

const discountTypeReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_DISCOUNT_TYPES:
            return {
                ...state,
                allDiscountTypes: action.payload,
                allDiscountDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ value: item._id, name: item.discountName })),
            };

        default:
            return { ...state };
    }
};

export default discountTypeReducer;
