import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getMembersipTypes = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.MEMBERSHIP_TYPES);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_MEMBERSHIP_TYPES,
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

const addMembershipType = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.MEMBERSHIP_TYPES, data);
    if (res.success) {
        next();
    }
    dispatch(hideLoaderAction());
};
const getMembershipType = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.MEMBERSHIP_TYPES + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const editMembershipType = (id, data, history) => async (dispatch, getState) => {
    dispatch(showLoaderAction());

    const res = await api('put', EndPoints.MEMBERSHIP_TYPES + id, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const deleteMembershipType = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.MEMBERSHIP_TYPES + id);
    if (res.success) {
        dispatch(getMembersipTypes(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getMembersipTypes, deleteMembershipType, addMembershipType, editMembershipType, getMembershipType };
