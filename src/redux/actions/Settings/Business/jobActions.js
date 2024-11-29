import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, hideTableLoaderAction, showLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getJobDetails = () => async (dispatch, getState) => {
    const state = getState();
    let jobTitle = state.settings.business.jobTitle;
    if (!jobTitle?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.JOB_TITLE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.BUSINESS.JOB_TITLE,
                payload: res.data,
            });
        }
    }
    dispatch(hideTableLoaderAction());
};
const addJobTitle = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', EndPoints.SETTINGS.BUSINESS.JOB_TITLE, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const getJobTitle = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.JOB_TITLE + id);
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

    const res = await api('put', EndPoints.SETTINGS.BUSINESS.JOB_TITLE + id, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const deleteJobTitle = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.BUSINESS.JOB_TITLE + id);
    if (res.success) {
        dispatch(getJobDetails(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { getJobDetails, addJobTitle, editJobTitle, deleteJobTitle, getJobTitle };
