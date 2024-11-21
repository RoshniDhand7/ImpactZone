import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import api from '../../../services/api';
import { showToast } from '../toastAction';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';

const verifyCashRegisterAccessCode = (accessCode, registerId, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', endPoints.VERIFY_ACCESS_CODE, {}, { accessCode, registerId });
    if (res.success) {
        next(res);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};
const cashRegisterCheckIn = (payload, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('post', endPoints.CASH_REGISTER_CHECK_IN, payload);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};
const cashRegisterCheckOut = (data, cashRegister, accessCode, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('post', endPoints.CASH_REGISTER_CHECK_OUT, {
        ...data,
        cashRegister,
        accessCode,
    });
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};
export const clearPOSPromo = () => {
    return {
        type: types.CLEAR_POS_PROMO,
        payload: [],
    };
};

const getPromoCodeDetail = (setLoading, promoCode) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', endPoints.PROMO_CODE, {}, { promoCode: promoCode[0] });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_PROMO_CODE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const validatePromoCodeAction = (promoCode, next) => async (dispatch) => {
    const res = await api('post', endPoints.VALIDATE_PROMO_CODE, { promoCode });
    next(res);
};

const addDropCheck = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', endPoints.POS.ADD_DROP, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

export { getPromoCodeDetail, verifyCashRegisterAccessCode, cashRegisterCheckIn, cashRegisterCheckOut, validatePromoCodeAction, addDropCheck };
