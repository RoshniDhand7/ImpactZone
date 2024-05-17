import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getPaymentMethods = (isActive) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('get', EndPoints.PAYMENT_METHODS, {}, { isActive });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_PAYMENT_METHODS,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideLoaderAction());
};

const getPaymentMethod = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.PAYMENT_METHODS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addPaymentMethod = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.PAYMENT_METHODS, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editPaymentMethod = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.PAYMENT_METHODS + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deletePaymentMethod = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.PAYMENT_METHODS + id);
    if (res.success) {
        dispatch(getPaymentMethods(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getPaymentMethods, addPaymentMethod, getPaymentMethod, editPaymentMethod, deletePaymentMethod };
