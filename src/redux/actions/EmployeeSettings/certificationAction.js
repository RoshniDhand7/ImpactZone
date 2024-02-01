import moment from 'moment/moment';
import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';
import { uploadFiles, uploadImages } from '../../../utils/commonFunctions';

const getCertificates = (id, setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const params = { employee: id };
    const res = await api('get', EndPoints.MANAGE_EMPLOYEE_CERTIFICATES, {}, params);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_MANAGE_EMPLOYEE_CERTIFICATES,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};
const addCertificates =
    (data, setLoading, history, tab = '') =>
    async (dispatch) => {
        setLoading(true);
        const payload = {
            ...data,
            acquiredDate: moment(data.acquiredDate).format('MM/DD/YYYY'),
            expirationDate: moment(data.expirationDate).format('MM/DD/YYYY'),
        };

        const res = await api('post', EndPoints.MANAGE_EMPLOYEE_CERTIFICATES, payload);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/employee/manage-employee/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
            dispatch(showToast({ severity: 'success', summary: res.message }));
        }
        setLoading(false);
    };
const getCertificate = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.MANAGE_EMPLOYEE_CERTIFICATES + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const editCertificates =
    (id, data, setLoading, history, tab = '') =>
    async (dispatch) => {
        setLoading(true);
        const payload = {
            ...data,
            acquiredDate: moment(data.acquiredDate).format('MM/DD/YYYY'),
            expirationDate: moment(data.expirationDate).format('MM/DD/YYYY'),
        };
        const res = await api('put', EndPoints.MANAGE_EMPLOYEE_CERTIFICATES + id, payload);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/employee/manage-employee/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
            dispatch(showToast({ severity: 'success', summary: res.message }));
        }
        setLoading(false);
    };
const deleteCertificates = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.MANAGE_EMPLOYEE_CERTIFICATES + id);
    if (res.success) {
        dispatch(getCertificates(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { getCertificates, addCertificates, editCertificates, deleteCertificates, getCertificate };
