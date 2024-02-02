import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getResourceTypes = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.RESOURCE_TYPE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_RESOURCE_TYPE,
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

const getResourceType = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.RESOURCE_TYPE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addResourceType = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.RESOURCE_TYPE, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editResourceType = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.RESOURCE_TYPE + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteResourceType = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.RESOURCE_TYPE + id);
    if (res.success) {
        dispatch(getResourceTypes(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getResourceTypes, addResourceType, getResourceType, editResourceType, deleteResourceType };
