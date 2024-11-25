import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, hideTableLoaderAction, showLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getResources = () => async (dispatch, getState) => {
    const state = getState();
    let resource = state.settings.members.resource;
    if (!resource?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.MEMBER_SETUP.RESOURCE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};

const getResource = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addResource = (data, setLoading, history) => async () => {
    setLoading(true);
    const res = await api('post', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editResource = (id, data, setLoading, history) => async () => {
    setLoading(true);
    const res = await api('put', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteResource = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE + id);
    if (res.success) {
        dispatch(getResources(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getResources, addResource, getResource, editResource, deleteResource };
