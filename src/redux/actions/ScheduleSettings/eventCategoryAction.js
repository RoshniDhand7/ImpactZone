import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getEventCategories = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.EVENT_CATEGORY);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_EVENT_CATEGORIES,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getEventCategory = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.EVENT_CATEGORY + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addEventCategory = (data, history) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.EVENT_CATEGORY, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const editEventCategory = (id, data, history) => async (dispatch, getState) => {
    dispatch(showLoaderAction());

    const res = await api('put', EndPoints.EVENT_CATEGORY + id, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const deleteEventCategory = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.EVENT_CATEGORY + id);
    if (res.success) {
        dispatch(getEventCategories(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getEventCategories, addEventCategory, getEventCategory, editEventCategory, deleteEventCategory };
