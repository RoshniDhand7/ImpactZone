import { types } from '../../types/types';
const intitalState = {
    allClubs: [],
};

const clubsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CLUBS:
            return {
                ...state,
                allClubs: action.payload,
            };
        default:
            return { ...state };
    }
};

export default clubsReducer;
