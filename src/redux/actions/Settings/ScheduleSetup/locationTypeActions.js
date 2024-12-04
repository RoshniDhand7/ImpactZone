import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { showToast } from '../../toastAction';

const getLocationTypes = () => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION_TYPE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.SCHEDULE_SETUP.LOCATION_TYPE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getLocationType = (id, returnData) => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION_TYPE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};

const addLocationType = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION_TYPE, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editLocationType = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION_TYPE + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteLocationType = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION_TYPE + id);
    if (res.success) {
        dispatch(getLocationTypes(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getLocationTypes, addLocationType, getLocationType, editLocationType, deleteLocationType };
