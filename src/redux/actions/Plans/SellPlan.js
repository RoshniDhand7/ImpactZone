import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { getIds } from '../../../utils/commonFunctions';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getSellPlan = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SELL_PLAN + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const addSellPlan = (id,data,type) => async (dispatch) => {
    dispatch(showLoaderAction());
    const payload = {
        name:data.name,
        oftenClientCharged:data.oftenClientCharged,
        club:getIds(data?.clubs),
        membershipType: data?.membershipType?._id,
        memberToSell: data.memberToSell.id,
        type: type, 
        services: getIds(data?.services),
    };

    const res = await api('post', EndPoints.SELL_PLAN+id, payload);
    if (res.success) {
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
        dispatch(getSellPlan(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getSellPlan, addSellPlan, editMembershipPlan, deleteMembershipPlan };
