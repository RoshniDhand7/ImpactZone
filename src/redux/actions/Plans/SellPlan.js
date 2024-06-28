import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { getIds } from '../../../utils/commonFunctions';
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
const getSellPlanMember = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.MEMBER_SELL_PLAN+id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const addSellPlan = (id,data,next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const payload = {
        name:data.name,
        oftenClientCharged:data.oftenClientCharged,
        club:getIds(data?.clubs),
        membershipType: data?.membershipType?._id,
        memberToSell: data.memberToSell.id,
        type:"next",
        services: getIds(data?.services),
    };

    const res = await api('post', EndPoints.SELL_PLAN+id, payload);
    if (res.success) {
        next()
    }
    dispatch(hideLoaderAction());
};
const editSellPlan = (id,payload,next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('put', EndPoints.EDIT_SELL_PLAN+id, payload);
    if (res.success) {
        next()
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

export { getSellPlan, addSellPlan, editSellPlan, deleteMembershipPlan ,getSellPlanMember};
