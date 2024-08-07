import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getDiscountTypes = (isActive) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.DISCOUNT_TYPES, {}, { isActive });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_DISCOUNT_TYPES,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideLoaderAction());
};

const getDiscountType = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.DISCOUNT_TYPES + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addDiscountType = (data, history) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.DISCOUNT_TYPES, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const editDiscountType = (id, data, history) => async (dispatch, getState) => {
    dispatch(showLoaderAction());

    const res = await api('put', EndPoints.DISCOUNT_TYPES + id, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const deleteDiscountType = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.DISCOUNT_TYPES + id);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getDiscountTypes, addDiscountType, getDiscountType, editDiscountType, deleteDiscountType };
