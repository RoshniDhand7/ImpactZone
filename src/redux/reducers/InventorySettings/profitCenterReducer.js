import { types } from '../../types/types';
const intitalState = {
    allProfitCenters: [],
    profitCenterDropdown: [],
};

const profitCenterReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_PROFIT_CENTERS:
            return {
                ...state,
                allProfitCenters: action.payload,
                profitCenterDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default profitCenterReducer;
