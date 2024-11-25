import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, hideTableLoaderAction, showLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getResourceTypes = () => async (dispatch, getState) => {
    const state = getState();
    let resourceType = state.settings.members.resourceType;
    if (!resourceType?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE_TYPE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.MEMBER_SETUP.RESOURCE_TYPE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};

const getResourceType = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE_TYPE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addResourceType = (data, setLoading, history) => async () => {
    setLoading(true);
    const res = await api('post', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE_TYPE, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editResourceType = (id, data, setLoading, history) => async () => {
    setLoading(true);
    const res = await api('put', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE_TYPE + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteResourceType = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.MEMBER_SETUP.RESOURCE_TYPE + id);
    if (res.success) {
        dispatch(getResourceTypes(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getResourceTypes, addResourceType, getResourceType, editResourceType, deleteResourceType };
