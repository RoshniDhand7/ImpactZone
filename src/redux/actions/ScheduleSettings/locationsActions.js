import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getLocations = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.LOCATIONS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_LOCATIONS,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getLocation = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.LOCATIONS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addLocation = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.LOCATIONS, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editLocation = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.LOCATIONS + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteLocation = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.LOCATIONS + id);
    if (res.success) {
        dispatch(getLocations(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getLocations, addLocation, getLocation, editLocation, deleteLocation };
