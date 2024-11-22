import { types } from '../types/types';
const initialBoard = {
    isTableLoading: false,
};

const tableLoaderReducer = (state = initialBoard, action) => {
    switch (action.type) {
        case types.SHOW_TABLE_LOADER:
            return { isTableLoading: true };
        case types.HIDE_TABLE_LOADER:
            return { isTableLoading: false };
        default:
            return { ...state };
    }
};

export default tableLoaderReducer;
