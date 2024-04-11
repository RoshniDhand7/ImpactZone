import { types } from '../types/types';
const initialBoard = {
    isLoading: false,
};

const loaderReducer = (state = initialBoard, action) => {
    switch (action.type) {
        case types.SHOW_LOADER:
            return { isLoading: true };
        case types.HIDE_LOADER:
            return { isLoading: false };
        default:
            return { ...state };
    }
};

export default loaderReducer;
