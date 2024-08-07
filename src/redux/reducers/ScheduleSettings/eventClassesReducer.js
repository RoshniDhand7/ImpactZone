import { types } from '../../types/types';
const intitalState = {
    allClasses: [],
};

const eventClassesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CLASSES:
            return {
                ...state,
                allClasses: action.payload,
            };

        default:
            return { ...state };
    }
};

export default eventClassesReducer;
