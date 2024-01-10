import { types } from '../types/types';

export const showToast = (obj) => async (dispatch) => {
    console.log('obj>>', obj);
    dispatch({ type: types.SHOW_TOAST, payload: obj });
    setTimeout(() => {
        dispatch({ type: types.SHOW_TOAST, payload: {} });
    }, 10);
};
