import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, showLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getSchedulings = () => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.SCHEDULE_SETUP.SCHEDULE_OPTION);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.SCHEDULE_SETUP.SCHEDULE_OPTION,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};

const addScheduling = (data) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.SETTINGS.SCHEDULE_SETUP.SCHEDULE_OPTION, data);
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
