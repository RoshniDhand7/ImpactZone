import { types } from '../../types/types';
const intitalState = {
    allCatalogItems: [],
    catalogTypeFilterItems: [],
};

const catalogItemsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CATALOG_ITEMS:
            return {
                ...state,
                allCatalogItems: action.payload,
                catalogTypeFilterItems: action.payload?.filter((item) => item.type === 'PRODUCT'),
            };
        default:
            return { ...state };
    }
};

export default catalogItemsReducer;
