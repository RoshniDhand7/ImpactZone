import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getSchedulings = () => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SCHEDULING_OPTIONS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_SCHEDULING_OPTIONS,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideLoaderAction());
};

const addScheduling = (data) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.SCHEDULING_OPTIONS, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};
const editScheduling = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.SETTINGS.SCHEDULE_SETUP.LEVEL + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};

export { getSchedulings, addScheduling, editScheduling };
