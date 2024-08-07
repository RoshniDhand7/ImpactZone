import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getAgreementTemplates = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.AGREEMENT_TEMPLATE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_AGREEMENT_TEMPLATE,
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
const getAgreementTemplate = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.AGREEMENT_TEMPLATE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const addAgreementTemplate = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.AGREEMENT_TEMPLATE, data);
    if (res.success) {
        next();
    }
    setLoading(false);
};
const editAgreementTemplate = (id, data, setLoading, next) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.AGREEMENT_TEMPLATE + id, data);
    if (res.success) {
        next();
    }
    setLoading(false);
};
const deleteAgreementTemplates = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.AGREEMENT_TEMPLATE + id);
    if (res.success) {
        dispatch(getAgreementTemplates(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const addAssets = (files, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    const res = await api('post', EndPoints.ASSETS, formData, {}, 'multipart/form-data');
    if (res.success) {
        dispatch(hideLoaderAction());
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};

const getAssets = (next) => async (dispatch) => {
    const res = await api('get', EndPoints.ASSETS);
    if (res.success) {
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};

const deleteAsset = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.ASSETS + id);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export {
    getAgreementTemplates,
    addAgreementTemplate,
    getAgreementTemplate,
    editAgreementTemplate,
    deleteAgreementTemplates,
    addAssets,
    getAssets,
    deleteAsset,
};
