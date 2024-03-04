import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getAccessSchedules = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.ACCESS_SCHEDULE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_ACCESS_SCHEDULE,
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

const getAccessSchedule = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.ACCESS_SCHEDULE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addAccessSchedule =
    (data, history, tab = '', next) =>
    async (dispatch) => {
        dispatch(showLoaderAction());

        const res = await api('post', EndPoints.ACCESS_SCHEDULE, data);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/members/access-schedule/edit/${res.data._id}/${tab}`);
            } else if (next) {
                next();
            } else {
                history.goBack();
            }
        }
        dispatch(hideLoaderAction());
    };
const editAccessSchedule =
    (id, data, setLoading, history, tab = '') =>
    async (dispatch) => {
        setLoading(true);

        const res = await api('put', EndPoints.ACCESS_SCHEDULE + id, data);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/members/access-schedule/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
            dispatch(showToast({ severity: 'success', summary: res.message }));
        }
        setLoading(false);
    };
const deleteAccessSchedule = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.ACCESS_SCHEDULE + id);
    if (res.success) {
        dispatch(getAccessSchedule(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getAccessSchedules, getAccessSchedule, addAccessSchedule, editAccessSchedule, deleteAccessSchedule };
