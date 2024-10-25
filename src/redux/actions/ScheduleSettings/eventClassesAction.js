import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { getTime } from '../../../utils/commonFunctions';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getEventClasses = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.CLASSES);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_CLASSES,
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

const getEventClass = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.CLASSES + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addClasses = (data, history) => async (dispatch) => {
    dispatch(showLoaderAction());

    const payload = {
        ...data,
        schedule: data?.schedule?.map((item) => ({ ...item, startTime: getTime(item.startTime) })),
        pay: data?.payType,
    };
    const res = await api('post', EndPoints.CLASSES, payload);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const editClasses = (id, data, history) => async (dispatch, getState) => {
    dispatch(showLoaderAction());
    const payload = {
        ...data,
        schedule: data?.schedule?.map((item) => ({ ...item, startTime: getTime(item.startTime) })),
        pay: data?.payType,
    };
    const res = await api('put', EndPoints.CLASSES + id, payload);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const deleteClasses = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.CLASSES + id);
    if (res.success) {
        dispatch(getEventClasses());
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getEventClass, addClasses, getEventClasses, editClasses, deleteClasses };
