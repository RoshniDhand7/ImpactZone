import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideTableLoaderAction, showTableLoaderAction } from '../loaderAction';

const getActivePlans = () => async (dispatch) => {
    dispatch(showTableLoaderAction());
    const res = await api('get', EndPoints.PLANS.ACTIVE);
    if (res.success) {
        dispatch({
            type: types.PLANS.ACTIVE,
            payload: res.data,
        });
    }
    dispatch(hideTableLoaderAction());
};

const getActivePlan = (id, returnData) => async () => {
    const res = await api('get', EndPoints.PLANS.ACTIVE + id);
    if (res.success) {
        if (returnData) {
            returnData(res.data);
        }
    }
};
const getMemberDetails = (id, returnData) => async () => {
    const res = await api('get', EndPoints.PLANS.MEMBER + id);
    if (res.success) {
        if (returnData) {
            returnData(res.data);
        }
    }
};

const createMemberSubscription = (data, setLoading, next) => async () => {
    if (setLoading) {
        setLoading(true);
    }
    let payload = { ...data };
    const res = await api('post', EndPoints.PLANS.PLAN, payload);
    if (res.success) {
        if (next) {
            next(res.data);
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};
const getSubscriptionAgreementDetails = (id, setLoading, returnData) => async () => {
    setLoading(true);
    const res = await api('get', EndPoints.PLANS.AGREEMENT + id);
    if (res.success) {
        if (returnData) {
            returnData(res.data);
        }
    }
    setLoading(false);
};
export { getActivePlans, getActivePlan, getMemberDetails, createMemberSubscription, getSubscriptionAgreementDetails };
