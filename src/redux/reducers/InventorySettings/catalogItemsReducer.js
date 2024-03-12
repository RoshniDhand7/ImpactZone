import { types } from '../../types/types';
const intitalState = {
    allCatalogItems: [],
    catalogTypeFilterItems: [],
    allCategoryVariations: [],
};

const catalogItemsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CATALOG_ITEMS:
            return {
                ...state,
                allCatalogItems: action.payload,
                catalogTypeFilterItems: action.payload?.filter((item) => item.type === 'PRODUCT'),
            };
        case types.CHANGE_INVENTORY_CATALOG_VARIATION:
            return {
                ...state,
                allCategoryVariations: action.payload,
            };
        default:
            return { ...state };
    }
};

export default catalogItemsReducer;
