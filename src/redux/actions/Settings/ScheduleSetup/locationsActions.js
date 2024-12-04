import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { showToast } from '../../toastAction';

const getLocations = () => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.SCHEDULE_SETUP.LOCATION,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getLocation = (id, returnData) => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};

const addLocation = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editLocation = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteLocation = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.SCHEDULE_SETUP.LOCATION + id);
    if (res.success) {
        dispatch(getLocations(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getLocations, addLocation, getLocation, editLocation, deleteLocation };
