import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getLevels = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.SETTINGS.SCHEDULE_SETUP.LEVEL);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_LEVELS,
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

const getLevel = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SETTINGS.SCHEDULE_SETUP.LEVEL + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addLevel = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.SETTINGS.SCHEDULE_SETUP.LEVEL, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editLevel = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.SETTINGS.SCHEDULE_SETUP.LEVEL + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteLevel = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.SCHEDULE_SETUP.LEVEL + id);
    if (res.success) {
        dispatch(getLevels(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getLevels, addLevel, getLevel, editLevel, deleteLevel };
