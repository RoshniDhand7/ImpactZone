import { types } from "../types/types";
const intitalState = {
    allVendor: [],
};

const VendorReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_VENDOR:
            return {
                ...state,
                allVendor: action.payload,
            }
        default:
            return { ...state };
    }
};
export default VendorReducer;