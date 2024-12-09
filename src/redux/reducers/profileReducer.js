import { types } from '../types/types';
const initialBoard = {
    user: {},
    club: '',
};

const profileReducer = (state = initialBoard, action) => {
    switch (action.type) {
        case types.PROFILE:
            return { ...state, user: action.payload };
        case types.CHANGE_CLUB:
            return {
                ...state,
                club: action.payload,
            };

        default:
            return { ...state };
    }
};

export default profileReducer;
