import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getAllDrafts = () => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('get', EndPoints.DRAFT_PLAN);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.PLANS.DRAFT,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

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
const getSellPlanAgreement = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.PLAN_AGREEMENT + id);
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
        onTabEnable(0, 1);
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

const deleteSellPlan = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.SELL_PLAN + id);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getSellPlan, addSellPlan, editSellPlan, deleteSellPlan, getSellPlanMember, checkAgreementNumberAction, getAllDrafts, getSellPlanAgreement };
