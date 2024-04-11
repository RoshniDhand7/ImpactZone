import { types } from '../types/types';
const initialBoard = {
    user: {},
};

const profileReducer = (state = initialBoard, action) => {
    switch (action.type) {
        case types.PROFILE:
            return { ...state, user: action.payload };

        default:
            return { ...state };
    }
};

export default profileReducer;
