import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getAgreementPromotions = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.AGREEMENT_PROMOTION);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_AGREEMENT_PROMOTION,
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
const getAgreementPromotion = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.AGREEMENT_PROMOTION + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const addAgreementPromotion = (data, history) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.AGREEMENT_PROMOTION, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const editAgreementPromotion = (id, data, history) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('put', EndPoints.AGREEMENT_PROMOTION + id, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const deleteAgreementPromotion = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.AGREEMENT_PROMOTION + id);
    if (res.success) {
        dispatch(getAgreementPromotions(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getAgreementPromotions, getAgreementPromotion, addAgreementPromotion, editAgreementPromotion, deleteAgreementPromotion };
