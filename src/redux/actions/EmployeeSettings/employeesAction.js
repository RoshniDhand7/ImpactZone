import moment from 'moment/moment';
import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';
import { uploadImages } from '../../../utils/commonFunctions';

const getEmployees = (pageNo, setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    // const params = { pageNo: pageNo + 1, itemsPerPage: 10 };
    const res = await api('get', EndPoints.EMPLOYEE, {});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_EMPLOYEES,
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
const addEmployees =
    (data, setLoading, history, tab = '') =>
    async (dispatch) => {
        setLoading(true);
        const payload = {
            ...data,
            dob: moment(data.dob).format('MM/DD/YYYY'),
        };

        const res = await api('post', EndPoints.EMPLOYEE, payload);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/employee/manage-employee/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
            dispatch(showToast({ severity: 'success', summary: res.message }));
        } else {
            dispatch(showToast({ severity: 'error', summary: res.message }));
        }
        setLoading(false);
    };
const getEmployee = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.EMPLOYEE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const getEmployeePay = (id) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.EMPLOYEE_PAY_TYPE + id);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_EMPLOYEES_PAY_TYPE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const CalendarDefaultSorting = (arr, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    const payload = { list: arr?.map((item) => item._id) };

    const res = await api('post', EndPoints.DEFAULT_CALENDAR, payload);
    if (res.success) {
        if (res.data) {
            next();
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const editEmployee =
    (id, data, setLoading, history, tab = '') =>
    async (dispatch) => {
        if (data?.image?.length) {
            data.image = await uploadImages(data.image);

            data.image = data.image[0];
        } else {
            data.image = '';
        }
        setLoading(true);
        const payload = {
            ...data,
            ...(data?.dob && { dob: moment(data.dob).format('MM/DD/YYYY') }),
            ...(data?.hireDate && { hireDate: moment(data.hireDate).format('MM/DD/YYYY') }),
            ...(data?.primaryPhone && { primaryPhone: data?.primaryPhone?.replace(/\D/g, '') }),
            ...(data?.workPhone && { workPhone: data?.workPhone?.replace(/\D/g, '') }),
            ...(data?.mobilePhone && { mobilePhone: data?.mobilePhone?.replace(/\D/g, '') }),
            ...(data?.faxPhone && { faxPhone: data?.faxPhone?.replace(/\D/g, '') }),
            ...(data?.emergencyPhone && { emergencyPhone: data?.emergencyPhone?.replace(/\D/g, '') }),
        };
        const res = await api('put', EndPoints.EMPLOYEE + id, payload);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/employee/manage-employee/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
            dispatch(showToast({ severity: 'success', summary: res.message }));
        } else {
            dispatch(showToast({ severity: 'error', summary: res.message }));
        }
        setLoading(false);
    };
const deleteEmployee = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.EMPLOYEE + id);
    if (res.success) {
        dispatch(getEmployees(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { getEmployees, addEmployees, editEmployee, deleteEmployee, getEmployee, getEmployeePay, CalendarDefaultSorting };
