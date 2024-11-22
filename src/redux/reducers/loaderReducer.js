import { types } from '../types/types';
const initialBoard = {
    isLoading: false,
    isTableLoading: false,
};

const loaderReducer = (state = initialBoard, action) => {
    switch (action.type) {
        case types.SHOW_LOADER:
            return { ...state, isLoading: true };
        case types.HIDE_LOADER:
            return { ...state, isLoading: false };
        case types.HIDE_TABLE_LOADER:
            return { ...state, isTableLoading: false };
        case types.SHOW_TABLE_LOADER:
            return { ...state, isTableLoading: true };
        default:
            return { ...state };
    }
};

export default loaderReducer;
