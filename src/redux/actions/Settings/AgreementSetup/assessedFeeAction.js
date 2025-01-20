import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, hideTableLoaderAction, showLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getAssesedFees = () => async (dispatch, getState) => {
    const state = getState();
    let assessedFees = state.settings.agreement.assessedFees;
    if (!assessedFees?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.AGREEMENT_SETUP.ASSESSED_FEE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.AGREEMENT_SETUP.ASSESSED_FEE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};
const addAssessedFee = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('post', EndPoints.SETTINGS.AGREEMENT_SETUP.ASSESSED_FEE, data);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
        dispatch(getAssesedFees());
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const editAssessedFee = (id, data, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('put', EndPoints.SETTINGS.AGREEMENT_SETUP.ASSESSED_FEE + id, data);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
        dispatch(getAssesedFees());
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const getAssessedFee = (id, returnData) => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.AGREEMENT_SETUP.ASSESSED_FEE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};

const deleteAssessedFee = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.AGREEMENT_SETUP.ASSESSED_FEE + id);
    if (res.success) {
        next();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getAssesedFees, addAssessedFee, deleteAssessedFee, getAssessedFee, editAssessedFee };
