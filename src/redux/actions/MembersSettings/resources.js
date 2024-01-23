import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getResources = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.RESOURCES);
    console.log(res)
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_RESOURCES,
                payload: res.data,
            });
        }
    }
    else {
        dispatch(showToast({ severity: 'error', summary: res.message??res }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getResource = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.RESOURCES + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addResource = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.RESOURCES, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editResource = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.RESOURCES + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteResource = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.RESOURCES + id);
    if (res.success) {
        dispatch(getResources(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getResources, addResource, getResource, editResource, deleteResource };
