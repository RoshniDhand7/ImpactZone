import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getTaxes = () => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.TAXES, {});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_TAXES,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideLoaderAction());
};

const getTax = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.TAXES + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addTax = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.TAXES, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editTax = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.TAXES + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteTax = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.TAXES + id);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getTaxes, addTax, getTax, editTax, deleteTax };
