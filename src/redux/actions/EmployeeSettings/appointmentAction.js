import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getEmployeeAppointmentPay = (employee, type, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.EMPLOYEE_APPOINTMENT, '', { employee, type: type });
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

const addEmployeeAppartmentBonus = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.EMPLOYEE_APPOINTMENT, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const editEmployeeSubstitutionOptions = (id, data, setLoading, next) => async () => {
    setLoading(true);

    const res = await api('put', EndPoints.EMPLOYEE_APPOINTMENT + id, data);
    if (res.success) {
        next();
    }
    setLoading(false);
};
const getEmployeeAppartmentBonus = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.EMPLOYEE_APPOINTMENT + id);

    console.log('res>>', res);
    if (res.success) {
        dispatch(hideLoaderAction());

        if (returnData) {
            returnData(res.data);
        }
    }
    dispatch(hideLoaderAction());
};

const deleteSubstitutionOption = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.SUSTITITION_OPTIONS + id);
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
    addEmployeeAppartmentBonus,
    getEmployeeAppartmentBonus,
    deleteSubstitutionOption,
    editEmployeeSubstitutionOptions,
};
