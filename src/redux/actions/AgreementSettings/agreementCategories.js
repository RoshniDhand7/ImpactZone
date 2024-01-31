import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getAgreementCategories = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.AGREEMENT_CATEGORY);
    console.log(res);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_AGREEMENT_CATEGORY,
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

const getAgreementCategory = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.AGREEMENT_CATEGORY + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addAgreementCategories = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.AGREEMENT_CATEGORY, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editAgreementCategories = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.AGREEMENT_CATEGORY + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteAgreementCategories = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.AGREEMENT_CATEGORY + id);
    if (res.success) {
        dispatch(getAgreementCategories(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getAgreementCategories, addAgreementCategories, getAgreementCategory, editAgreementCategories, deleteAgreementCategories };
