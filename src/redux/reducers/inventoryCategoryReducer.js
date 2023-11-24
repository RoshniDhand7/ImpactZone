import { types } from "../types/types";
const intitalState = {
    allInventoryCategory: [],
};

const InventoryCategoryReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_INVENTORY_CATEGORY:
            return {
                ...state,
                allInventoryCategory: action.payload,
            }
        default:
            return { ...state };
    }
};
export default InventoryCategoryReducer;