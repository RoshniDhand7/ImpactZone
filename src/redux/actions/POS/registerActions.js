import endPoints from '../../../services/endPoints';
import api from '../../../services/api';
import { types } from '../../types/types';
import { showToast } from '../toastAction';

const getRegistersAction = () => async (dispatch) => {
    const res = await api('get', endPoints.POS.REGISTER);
    if (res.success) {
        dispatch({
            type: types.POS.REGISTER,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const getRegisterAction = (id, next) => async (dispatch) => {
    const res = await api('get', endPoints.POS.REGISTER + id);
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

export { getRegistersAction, getRegisterAction };
