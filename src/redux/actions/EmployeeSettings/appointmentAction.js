import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getEmployeeAppointmentPay = (employee, isClassLevel, type, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.EMPLOYEE_APPOINTMENT, '', { employee, type: type, isClassLevel });
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

const addEmployeeAppointmentPay = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.EMPLOYEE_APPOINTMENT, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
const isDefaultAppointmentPay = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.EMPLOYEE_APPOINTMENT_IS_DEFAULT, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};
const editEmployeeAppointmentPay = (id, data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.EMPLOYEE_APPOINTMENT + id, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const getEmployeeAppartment = (employee, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.EMPLOYEE_APPOINTMENT + employee);
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
const deletetEmployeeAppartment = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.EMPLOYEE_APPOINTMENT + id);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getEmployeeSubstitutionOptions = (employee, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.SUSTITITION_OPTIONS, '', { employee });
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

const addEmployeeBonus = (type, data, setLoading, next) => async (dispatch) => {
    setLoading(true);
    let res;
    if (type === 'appointment') {
        res = await api('post', EndPoints.EMPLOYEE_APPOINTMENT, data);
    } else {
        res = await api('post', EndPoints.SALES_COMMISSION, data);
    }

    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const editEmployeeBonus = (type, id, data, setLoading, next) => async () => {
    setLoading(true);
    let res;
    if (type === 'appointment') {
        res = await api('put', EndPoints.EMPLOYEE_APPOINTMENT + id, data);
    } else {
        res = await api('put', EndPoints.SALES_COMMISSION + id, data);
    }

    if (res.success) {
        next();
    }
    setLoading(false);
};
const getEmployeeBonus = (type, id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    let res;
    if (type === 'appointment') {
        res = await api('get', EndPoints.EMPLOYEE_APPOINTMENT + id);
    } else {
        res = await api('get', EndPoints.SALES_COMMISSION + id);
    }

    if (res.success) {
        dispatch(hideLoaderAction());

        if (returnData) {
            returnData(res.data);
        }
    }
    dispatch(hideLoaderAction());
};

const deleteEmployeeBonus = (type, id, next) => async (dispatch) => {
    let res;
    if (type === 'appointment') {
        res = await api('delete', EndPoints.EMPLOYEE_APPOINTMENT + id);
    } else {
        res = await api('delete', EndPoints.SALES_COMMISSION + id);
    }
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export {
    getEmployeeAppointmentPay,
    addEmployeeAppointmentPay,
    getEmployeeAppartment,
    editEmployeeAppointmentPay,
    deletetEmployeeAppartment,
    getEmployeeSubstitutionOptions,
    addEmployeeBonus,
    getEmployeeBonus,
    deleteEmployeeBonus,
    editEmployeeBonus,
    isDefaultAppointmentPay,
};
