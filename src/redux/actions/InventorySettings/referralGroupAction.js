import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getReferralGroups = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.REFERRAL_GROUPS);
    console.log(res);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_REFERRAL_GROUPS,
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

const getReferralGroup = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.REFERRAL_GROUPS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addReferralGroups = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.REFERRAL_GROUPS, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editReferralGroups = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.REFERRAL_GROUPS + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteReferralGroups = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.REFERRAL_GROUPS + id);
    if (res.success) {
        dispatch(getReferralGroups(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getReferralGroups, addReferralGroups, getReferralGroup, editReferralGroups, deleteReferralGroups };
