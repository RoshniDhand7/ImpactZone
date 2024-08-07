import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getJobDetails = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.JOB_TITLE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_JOB_TITLE,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};
const addJobTitle = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.JOB_TITLE, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const getJobTitle = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.JOB_TITLE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const editJobTitle = (id, data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.JOB_TITLE + id, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const deleteJobTitle = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.JOB_TITLE + id);
    if (res.success) {
        dispatch(getJobDetails(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { getJobDetails, addJobTitle, editJobTitle, deleteJobTitle, getJobTitle };
