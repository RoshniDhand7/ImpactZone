import { types } from '../../types/types';
const intitalState = {
    allCatalogItems: [],
};

const catalogItemsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CATALOG_ITEMS:
            return {
                ...state,
                allCatalogItems: action.payload,
            };
        default:
            return { ...state };
    }
};

export default catalogItemsReducer;
