import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideTableLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getMembersipTypes = () => async (dispatch, getState) => {
    const state = getState();
    let membershipTypes = state.settings.members.membershipTypes || state.settings.members.membershipTypesDropdown;
    if (!membershipTypes?.length) {
        dispatch(showTableLoaderAction());
    }

    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.MEMBERSHIP_TYPE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.MEMBER_SETUP.MEMEBERSHIP_TYPE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};

export const reorderPriority = (membershipTypes, next) => async (dispatch) => {
    const res = await api('post', EndPoints.SETTINGS.MEMBER_SETUP.MEMBERSHIP_TYPE_REORDER_PRIORITY, {
        membershipTypes: membershipTypes?.map((item) => item?._id),
    });
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};

const addMembershipType = (data, next) => async (dispatch) => {
    dispatch(showTableLoaderAction());
    const res = await api('post', EndPoints.SETTINGS.MEMBER_SETUP.MEMBERSHIP_TYPE, data);
    if (res.success) {
        next();
    }
    dispatch(hideTableLoaderAction());
};

const getMembershipType = (id, returnData) => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.MEMBERSHIP_TYPE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};
const editMembershipType = (id, data, history) => async (dispatch, getState) => {
    dispatch(showTableLoaderAction());
    const res = await api('put', EndPoints.SETTINGS.MEMBER_SETUP.MEMBERSHIP_TYPE + id, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideTableLoaderAction());
};
const deleteMembershipType = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.MEMBER_SETUP.MEMBERSHIP_TYPE + id);
    if (res.success) {
        dispatch(getMembersipTypes(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getMembersipTypes, deleteMembershipType, addMembershipType, editMembershipType, getMembershipType };
