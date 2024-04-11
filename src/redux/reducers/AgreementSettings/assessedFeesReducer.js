import { types } from '../../types/types';

const initialState = {
    allAssessedFees: [],
    allAssessedFeesDropdown: [],
};

const assesedFeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_ASSESSED_FEES:
            return { ...state, allAssessedFees: action.payload, allAssessedFeesDropdown: action.payload.map((item) => ({ name: item.name, value: item._id })) };

        default:
            return { ...state };
    }
};
export default assesedFeesReducer;
