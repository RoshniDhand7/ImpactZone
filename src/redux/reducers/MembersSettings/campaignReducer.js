import { types } from '../../types/types';
const intitalState = {
    allCompaigns: [],
    compaignDropdown: [],
};

const camapignReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_COMPAIGNS:
            return {
                ...state,
                allCompaigns: action.payload,
                compaignDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default camapignReducer;
