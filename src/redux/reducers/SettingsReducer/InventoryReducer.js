import { types } from '../../types/types';
const intitalState = {
    catalogs: [],
    profitCenters: [],
    categories: [],
    vendors: [],
    commissionGroups: [],
    referralGroups: [],
};

const InventoryReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.INVENTORY.CATELOG:
            return {
                ...state,
                catalogs: action.payload,
            };
        case types.SETTINGS.INVENTORY.PROFIT_CENTER:
            return {
                ...state,
                profitCenters: action.payload,
            };
        case types.SETTINGS.INVENTORY.CATEGORY:
            return {
                ...state,
                categories: action.payload,
            };
        case types.SETTINGS.INVENTORY.VENDORS:
            return {
                ...state,
                vendors: action.payload,
            };
        case types.SETTINGS.INVENTORY.COMMISSION_GROUP:
            return {
                ...state,
                commissionGroups: action.payload,
            };
        case types.SETTINGS.INVENTORY.REFERRAL_GROUP:
            return {
                ...state,
                referralGroups: action.payload,
            };

        default:
            return { ...state };
    }
};

export default InventoryReducer;
