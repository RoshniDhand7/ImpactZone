import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { getIds } from '../../../utils/commonFunctions';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getMembershipPlans = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.MEMBERSHIP_PLAN);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_MEMBERSHIP_PLAN,
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
const getMembershipPlan = (id, memberId, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const params = { memberId: memberId };
    const res = await api('get', EndPoints.MEMBERSHIP_PLAN + id, {}, params);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const addMembershipPlan = (data, history) => async (dispatch) => {
    dispatch(showLoaderAction());
    const payload = {
        ...data,
        services: getIds(data?.services),
        membershipPlan: getIds(data?.membershipPlan),
    };

    const res = await api('post', EndPoints.MEMBERSHIP_PLAN, payload);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const editMembershipPlan = (id, data, history) => async (dispatch, getState) => {
    dispatch(showLoaderAction());
    const payload = {
        ...data,
        services: getIds(data?.services),
        membershipPlan: getIds(data?.membershipPlan),
    };
    const res = await api('put', EndPoints.MEMBERSHIP_PLAN + id, payload);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const deleteMembershipPlan = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.MEMBERSHIP_PLAN + id);
    if (res.success) {
        dispatch(getMembershipPlans(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getMembershipPlans, getMembershipPlan, addMembershipPlan, editMembershipPlan, deleteMembershipPlan };
