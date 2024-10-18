import endPoints from '../../../services/endPoints';
import api from '../../../services/api';
import { showToast } from '../toastAction';

const getSavedCartsAction = (next) => async (dispatch) => {
    const res = await api('get', endPoints.SAVED_CART);
    if (res.success) {
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const getSavedCartAction = (id, next) => async (dispatch) => {
    const res = await api('get', endPoints.SAVED_CART + id);
    if (res.success) {
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const onSaveCartAction = (data, setLoading, next) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('post', endPoints.SAVED_CART, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

export { onSaveCartAction, getSavedCartsAction, getSavedCartAction };
