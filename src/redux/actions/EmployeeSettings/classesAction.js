import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getEmployeeClasses = (employee, isClassLevel, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.EMPLOYEE_CLASSES, '', { employee, isClassLevel });
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

const addEmployeeClasses = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.EMPLOYEE_CLASSES, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
const editEmployeeClasses = (id, data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.EMPLOYEE_CLASSES + id, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const getEmployeeClaases = (employee, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.EMPLOYEE_CLASSES + employee);
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
const deleteEmployeeClasses = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.EMPLOYEE_CLASSES + id);
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

const addEmployeeSubstitutionOptions = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.SUSTITITION_OPTIONS, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const editEmployeeSubstitutionOptions = (id, data, setLoading, next) => async () => {
    setLoading(true);

    const res = await api('put', EndPoints.SUSTITITION_OPTIONS + id, data);
    if (res.success) {
        next();
    }
    setLoading(false);
};
const getSubstitutionOption = (substitutionOptionsId, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SUSTITITION_OPTIONS + substitutionOptionsId);

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
    getEmployeeClasses,
    addEmployeeClasses,
    getEmployeeClaases,
    editEmployeeClasses,
    deleteEmployeeClasses,
    getEmployeeSubstitutionOptions,
    addEmployeeSubstitutionOptions,
    getSubstitutionOption,
    deleteSubstitutionOption,
    editEmployeeSubstitutionOptions,
};
