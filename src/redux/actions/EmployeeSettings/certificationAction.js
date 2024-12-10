import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';
import { dateConversions, uploadFiles } from '../../../utils/commonFunctions';

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
        if (data.certificate?.length) {
            let durls = await uploadFiles(data.certificate);
            data.certificate = durls[0].path;
            data.certificateName = durls[0].originalname;
            data.certificateSize = durls[0].size;
        } else {
            data.certificate = '';
        }

        const payload = {
            ...data,
            acquiredDate: dateConversions(data?.acquiredDate),
            expirationDate: dateConversions(data.expirationDate),
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
        if (data.certificate?.length) {
            let durls = await uploadFiles(data.certificate);
            data.certificate = durls[0].path;
            data.certificateName = durls[0].originalname;
            data.certificateSize = durls[0].size;
        } else {
            data.certificate = '';
        }

        const payload = {
            ...data,
            acquiredDate: dateConversions(data?.acquiredDate),
            expirationDate: dateConversions(data?.expirationDate),
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
const deleteCertificates = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.MANAGE_EMPLOYEE_CERTIFICATES + id);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getEmployeeNotes = (employee, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.NOTES, '', { employee });
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};

const addEmployeeNotes = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.NOTES, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));

        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
export { getCertificates, addCertificates, editCertificates, deleteCertificates, getCertificate, getEmployeeNotes, addEmployeeNotes };
