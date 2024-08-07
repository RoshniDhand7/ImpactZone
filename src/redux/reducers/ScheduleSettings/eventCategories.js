import { types } from '../../types/types';
const intitalState = {
    allEventCategories: [],
};

const eventCategoryReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_EVENT_CATEGORIES:
            return {
                ...state,
                allEventCategories: action.payload,
            };

        default:
            return { ...state };
    }
};

export default eventCategoryReducer;
