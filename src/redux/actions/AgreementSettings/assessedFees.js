import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getAssesedFees = (data) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.ASSESSED_FEE, {}, data);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_ASSESSED_FEES,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideLoaderAction());
};
const addAssessedFees = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('post', EndPoints.ASSESSED_FEE, data);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const editAssessedFees = (id, data, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('put', EndPoints.ASSESSED_FEE + id, data);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const getAssessedFee = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.ASSESSED_FEE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const deleteAssessedFees = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.ASSESSED_FEE + id);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getAssesedFees, addAssessedFees, deleteAssessedFees, getAssessedFee, editAssessedFees };
