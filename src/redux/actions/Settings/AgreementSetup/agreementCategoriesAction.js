import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideTableLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getAgreementCategories = () => async (dispatch, getState) => {
    const state = getState();
    console.log(state, 'state');
    let agreementCategories = state.settings.agreement.agreementCategories;
    if (!agreementCategories?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_CATEGORY);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.AGREEMENT_SETUP.AGREEMENT_CATEGORY,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};
const getAgreementCategory = (id, returnData) => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_CATEGORY + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};
const addAgreementCategories = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_CATEGORY, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editAgreementCategories = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_CATEGORY + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteAgreementCategories = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.AGREEMENT_SETUP.AGREEMENT_CATEGORY + id);
    if (res.success) {
        dispatch(getAgreementCategories());
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getAgreementCategories, addAgreementCategories, getAgreementCategory, editAgreementCategories, deleteAgreementCategories };
