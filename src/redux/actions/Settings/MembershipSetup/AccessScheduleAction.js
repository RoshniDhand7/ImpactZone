import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, hideTableLoaderAction, showLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getAccessSchedules = () => async (dispatch, getState) => {
    const state = getState();
    let assessSchedule = state.settings.members.assessSchedule;
    if (!assessSchedule?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.ACCESS_SCHEDULE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.MEMBER_SETUP.ACCESS_SCHEDULE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};

const getAccessSchedule = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.ACCESS_SCHEDULE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideLoaderAction());
};

const addAccessSchedule =
    (data, history, tab = '', next) =>
    async (dispatch) => {
        dispatch(showTableLoaderAction());

        const res = await api('post', EndPoints.SETTINGS.MEMBER_SETUP.ACCESS_SCHEDULE, data);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/member-setup/access-schedule/edit/${res.data._id}/${tab}`);
            } else if (next) {
                next();
            } else {
                history.goBack();
            }
        }
        dispatch(hideTableLoaderAction());
    };
const editAccessSchedule =
    (id, data, setLoading, history, tab = '') =>
    async (dispatch) => {
        setLoading(true);

        const res = await api('put', EndPoints.SETTINGS.MEMBER_SETUP.ACCESS_SCHEDULE + id, data);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/member-setup/access-schedule/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
            dispatch(showToast({ severity: 'success', summary: res.message }));
        }
        setLoading(false);
    };
const deleteAccessSchedule = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.MEMBER_SETUP.ACCESS_SCHEDULE + id);
    if (res.success) {
        dispatch(getAccessSchedules(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getAccessSchedules, getAccessSchedule, addAccessSchedule, editAccessSchedule, deleteAccessSchedule };
