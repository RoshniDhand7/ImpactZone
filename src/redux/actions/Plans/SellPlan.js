import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
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
    const res = await api('get', EndPoints.MEMBER_SELL_PLAN + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const addSellPlan = (id, data, onTabEnable, history, getMembershipPlan) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.SELL_PLAN + id, data);
    if (res.success) {
        onTabEnable([0, 1]);
        history.push(`/plans/sell-plan/${id}/${res.data._id}/${data.memberToSell}/${'?tab=personal'}`);
        getMembershipPlan();
    }
    dispatch(hideLoaderAction());
};
const editSellPlan = (newPlanId, payload, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('put', EndPoints.SELL_PLAN + newPlanId, payload);
    if (res.success) {
        next();
    }
    dispatch(hideLoaderAction());
};

const checkAgreementNumberAction = (val, newPlanId, next) => async (dispatch) => {
    const paylaod = {
        agreementNo: val,
    };

    const res = await api('post', EndPoints.UNIQUE_AGREEMENT + newPlanId, paylaod);
    if (res.success) {
        next(res.success);
    } else {
        next(res.success);
    }
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

export { getSellPlan, addSellPlan, editSellPlan, deleteMembershipPlan, getSellPlanMember, checkAgreementNumberAction };
