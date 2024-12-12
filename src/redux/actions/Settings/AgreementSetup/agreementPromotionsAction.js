import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, hideTableLoaderAction, showLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getAgreementPromotions = () => async (dispatch, getState) => {
    const state = getState();
    let agreementPromotions = state.settings.agreement.agreementPromotions;
    if (!agreementPromotions?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PROMOTION);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PROMOTION,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};
const getAgreementPromotion = (id, returnData) => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PROMOTION + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};
const addAgreementPromotion = (data, history) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PROMOTION, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const editAgreementPromotion = (id, data, history) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('put', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PROMOTION + id, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideLoaderAction());
};
const deleteAgreementPromotion = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_PROMOTION + id);
    if (res.success) {
        dispatch(getAgreementPromotions(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getAgreementPromotions, getAgreementPromotion, addAgreementPromotion, editAgreementPromotion, deleteAgreementPromotion };
