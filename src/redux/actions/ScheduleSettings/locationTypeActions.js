import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getLocationTypes = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.LOCATION_TYPE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_LOCATION_TYPE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getLocationType = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.LOCATION_TYPE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addLocationType = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.LOCATION_TYPE, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editLocationType = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.LOCATION_TYPE + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteLocationType = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.LOCATION_TYPE + id);
    if (res.success) {
        dispatch(getLocationTypes(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getLocationTypes, addLocationType, getLocationType, editLocationType, deleteLocationType };
