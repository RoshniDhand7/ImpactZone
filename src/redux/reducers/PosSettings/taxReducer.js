import { types } from '../../types/types';
const intitalState = {
    allTaxes: [],
    allTaxDropdown: [],
};

const taxReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_TAXES:
            return {
                ...state,
                allTaxes: action.payload,
                allTaxDropdown: action.payload
                    ?.filter((item) => item.isActive)
                    .map((item) => ({ value: item._id, name: `${item.taxRateName} (${item?.taxRatePercentage}%)` })),
            };

        default:
            return { ...state };
    }
};

export default taxReducer;
