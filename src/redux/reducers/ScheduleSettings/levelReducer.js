import { types } from '../../types/types';
const intitalState = {
    allLevels: [],
    levelDropdown: [],
};

const levelReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_LEVELS:
            return {
                ...state,
                allLevels: action.payload,
                levelDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ value: item._id, name: item.name })),
            };

        default:
            return { ...state };
    }
};

export default levelReducer;
