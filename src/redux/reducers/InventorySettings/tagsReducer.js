import { types } from '../../types/types';
const intitalState = {
    allTags: [],
    tagsDropDown: [],
};

const tagsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_TAGS:
            return {
                ...state,
                allTags: action.payload,
                tagsDropDown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default tagsReducer;
