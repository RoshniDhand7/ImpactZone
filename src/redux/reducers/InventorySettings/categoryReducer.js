import { types } from '../../types/types';
const intitalState = {
    allCategory: [],
    categoryDropdown: [],
};

const categoryReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CATEGORIES:
            return {
                ...state,
                allCategory: action.payload,
                categoryDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default categoryReducer;
