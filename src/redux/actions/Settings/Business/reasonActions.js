import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, hideTableLoaderAction, showLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getReasonsDetails = () => async (dispatch, getState) => {
    const state = getState();
    let reasonCode = state.settings.business.reasonCode;
    if (!reasonCode?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.REASON_CODE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.BUSSINESS.REASON_CODE,
                payload: res.data,
            });
        }
    }
    dispatch(hideTableLoaderAction());
};
const getNoSaleReasons = (setLoading) => async (dispatch) => {
    setLoading(true);
    const res = await api('get', EndPoints.POS.NO_SALE_REASON_CODE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.POS.NO_SALE_REASON_CODE,
                payload: res.data,
            });
        }
    }
    setLoading(false);
};
const addReasonCode = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.SETTINGS.BUSINESS.REASON_CODE, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const getReasonCode = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.REASON_CODE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const editReasonCode = (id, data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.SETTINGS.BUSINESS.REASON_CODE + id, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const deleteReasonCode = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.BUSINESS.REASON_CODE + id);
    if (res.success) {
        dispatch(getReasonsDetails(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { getReasonsDetails, addReasonCode, editReasonCode, deleteReasonCode, getReasonCode, getNoSaleReasons };
