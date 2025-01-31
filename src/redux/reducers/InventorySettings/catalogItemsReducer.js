import { types } from '../../types/types';
const intitalState = {
    allCatalogItems: [],
    allCatalogFilterItems: [],
    allCatalogItemsFilter: [],
    catalogTypeFilterItems: [],
    allCategoryVariations: [],
    catalogServiceFilterItems: [],
    catalogServiceDropdown: [],
    catalogDropDown: [],
    posCatalog: [],
    catalogProductDropdown: [],
};

const catalogItemsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CATALOG_ITEMS:
            return {
                ...state,
                allCatalogItems: action.payload,
                allCatalogItemsFilter: action.payload
                    ?.filter((item) => item.isActive)
                    ?.map((item) => ({
                        name: item.name,
                        _id: item._id,
                        upc: item.upc,
                        netPrice: item.netPrice,
                        img: item.catalogImage,
                    })),
                catalogTypeFilterItems: action.payload
                    ?.filter((item) => item.type === 'PRODUCT' && item.isActive)
                    ?.map((item) => ({ name: item.name, _id: item._id, upc: item.upc, netPrice: item.netPrice })),
                catalogServiceFilterItems: action.payload
                    ?.filter((item) => item.type === 'SERVICE' && item.isActive)
                    ?.map((item) => ({ name: item.name, _id: item._id, upc: item.upc, netPrice: item.netPrice })),
                catalogProductDropdown: action.payload
                    .filter((item) => item.type === 'PRODUCT' && item.isActive)
                    ?.map((item) => ({ name: item.name, value: item?._id })),
                catalogServiceDropdown: action.payload
                    ?.filter((item) => item.type === 'SERVICE' && item.isActive)
                    ?.map((item) => ({ name: item.name, value: item?._id })),
                catalogDropDown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item?._id })),
            };
        case types.CHANGE_CATALOG_ITEMS_FILTER:
            return {
                ...state,
                allCatalogFilterItems: action.payload?.filter((item) => item.isActive),
            };
        case types.CHANGE_INVENTORY_CATALOG_VARIATION:
            return {
                ...state,
                allCategoryVariations: action.payload,
            };
        case types.CHANGE_POS_CATALOG_ITEMS:
            return {
                ...state,
                posCatalog: action.payload,
            };
        default:
            return { ...state };
    }
};

export default catalogItemsReducer;
