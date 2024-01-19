import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { convertToBackendPermissions } from '../../../utils/permissions';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getPermissions = () => async (dispatch) => {
    const res = await api('get', EndPoints.GET_PERMISSIONS);

    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_PERMISSIONS,
                payload: res.data,
            });
        }
    }
};
const getSecurityRoles = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.SECURITY_ROLE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_SECURITY_ROLES,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getSecurityRole = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SECURITY_ROLE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addSecurityRole = (data, selectedPermissions, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);
    const state = getState();
    const { allPermissions } = state.securityRole;

    const permissions = await convertToBackendPermissions(allPermissions, selectedPermissions);

    const payload = {
        ...data,
        permissions,
        rawPermissions: selectedPermissions,
    };

    console.log(payload);

    const res = await api('post', EndPoints.SECURITY_ROLE, payload);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editSecurityRole = (id, data, selectedPermissions, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);
    const state = getState();
    const { allPermissions } = state.securityRole;

    const permissions = await convertToBackendPermissions(allPermissions, selectedPermissions);

    const payload = {
        ...data,
        permissions,
        rawPermissions: selectedPermissions,
    };

    console.log(payload);

    const res = await api('put', EndPoints.SECURITY_ROLE + id, payload);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteSecurityRole = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SECURITY_ROLE + id);
    if (res.success) {
        dispatch(getSecurityRoles(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getPermissions, addSecurityRole, getSecurityRoles, getSecurityRole, editSecurityRole, deleteSecurityRole };
