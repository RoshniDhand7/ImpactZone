import { types } from '../types/types';
const intitalState = {
    toastInfo: {},
};

const toastReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SHOW_TOAST:
            return {
                ...state,
                toastInfo: action.payload,
            };
        default:
            return { ...state };
    }
};

export default toastReducer;
