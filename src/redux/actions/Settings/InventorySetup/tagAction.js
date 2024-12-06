import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, showLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getTags = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.TAGS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_TAGS,
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

const getTag = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.TAGS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addTags = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.TAGS, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};
const editTags = (id, data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('put', EndPoints.TAGS + id, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    }
    dispatch(hideLoaderAction());
};
const deleteTags = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.TAGS + id);
    if (res.success) {
        dispatch(getTags(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getTags, addTags, getTag, editTags, deleteTags };
