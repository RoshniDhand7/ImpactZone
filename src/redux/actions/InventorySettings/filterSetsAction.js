import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getFilterSets = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.FILTER_SETS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_FILTER_SETS,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getFilterSet = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.FILTER_SETS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addFilterSet = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.FILTER_SETS, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};
const editFilterSet = (id, data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('put', EndPoints.FILTER_SETS + id, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};
const deleteFilterSet = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.FILTER_SETS + id);
    if (res.success) {
        dispatch(getFilterSets(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getFilterSets, addFilterSet, getFilterSet, editFilterSet, deleteFilterSet };
