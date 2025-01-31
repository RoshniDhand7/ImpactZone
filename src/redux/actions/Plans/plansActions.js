import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { uploadImages } from '../../../utils/commonFunctions';
import { types } from '../../types/types';
import { hideTableLoaderAction, showTableLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

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

const createMemberSubscription = (data, setLoading, next) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    let payload = { ...data };
    const res = await api('post', EndPoints.PLANS.PLAN, payload);
    if (res.success) {
        if (next) {
            next(res.data);
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
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
const signSubscriptionAgreement = (id, data, signatures, setLoading, next) => async () => {
    setLoading(true);

    let _signatures = await uploadImages(signatures.map((item) => item.url));
    _signatures = _signatures.map((item) => ({ url: item }));
    let payload = { htmlContent: data.htmlContent, signatures: _signatures };
    const res = await api('put', EndPoints.PLANS.AGREEMENT + id, payload);
    if (res.success) {
        if (next) {
            next(res.data);
        }
    }
    setLoading(false);
};
export { getActivePlans, getActivePlan, getMemberDetails, createMemberSubscription, getSubscriptionAgreementDetails, signSubscriptionAgreement };
