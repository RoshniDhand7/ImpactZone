import { types } from '../../types/types';
const intitalState = {
    allCatalogItems: [],
    allCatalogItemsFilter: [],
    catalogTypeFilterItems: [],
    allCategoryVariations: [],
    catalogServiceFilterItems: [],
    catalogServiceDropdown: [],
};

const catalogItemsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CATALOG_ITEMS:
            return {
                ...state,
                allCatalogItems: action.payload,
                allCatalogItemsFilter: action.payload?.map((item) => ({
                    name: item.name,
                    _id: item._id,
                    upc: item.upc,
                    unitPrice: item.unitPrice,
                    img: item.catalogImage,
                })),
                catalogTypeFilterItems: action.payload
                    ?.filter((item) => item.type === 'PRODUCT')
                    ?.map((item) => ({ name: item.name, _id: item._id, upc: item.upc, unitPrice: item.unitPrice })),
                catalogServiceFilterItems: action.payload
                    ?.filter((item) => item.type === 'SERVICE')
                    ?.map((item) => ({ name: item.name, _id: item._id, upc: item.upc, unitPrice: item.unitPrice })),
                catalogServiceDropdown: action.payload?.filter((item) => item.type === 'SERVICE')?.map((item) => ({ name: item.name, value: item?._id })),
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
