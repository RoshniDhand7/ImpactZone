import { types } from '../../types/types';
const intitalState = {
    allFilterSet: [],
    filterSetDropDown: [],
};

const filterSetReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_FILTER_SETS:
            return {
                ...state,
                allFilterSet: action.payload,
                filterSetDropDown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default filterSetReducer;
