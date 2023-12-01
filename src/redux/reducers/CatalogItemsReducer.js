import { types } from "../types/types";
const intitalState = {
    allCatalogItems: [],
};

const CatalogItemsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_CATALOG_ITEMS:
            return {
                ...state,
                allCatalogItems: action.payload,
            }
        default:
            return { ...state };
    }
};
export default CatalogItemsReducer;