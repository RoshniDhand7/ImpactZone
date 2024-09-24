import { types } from '../../types/types';
const intitalState = {
    allVendors: [],
    vendorsDropdown: [],
};

const VendorsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_VENDORS:
            return {
                ...state,
                allVendors: action.payload,
                vendorsDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default VendorsReducer;
