import { types } from '../../types/types';
const intitalState = {
    allClubs: [],
    clubsDropdown: [],
};

const clubsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_CLUBS:
            return {
                ...state,
                allClubs: action.payload,
                clubsDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default clubsReducer;
