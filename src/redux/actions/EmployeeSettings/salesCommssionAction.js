import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getEmployeeSalesItem = (employee, type, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.SALES_COMMISSION, '', { employee, type: type });
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

const addEmployeeSalesItem = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.SALES_COMMISSION, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
const editEmployeeSalesItem = (id, data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.SALES_COMMISSION + id, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const getEmployeeSaleItem = (employee, setLoading, returnData) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.SALES_COMMISSION + employee);
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
const deletetEmployeeSaleItem = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.SALES_COMMISSION + id);
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

//Sales Code
const addEmployeeSalesCode = (data) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('post', EndPoints.EMPLOYEE_SALES_CODE, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const getEmployeeSalesCode = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.EMPLOYEE_SALES_CODE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const getEmployeeSalesCodes = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.EMPLOYEE_SALES_CODE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.EMPLOYEE_SALES_CODE,
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

export {
    getEmployeeSalesItem,
    addEmployeeSalesItem,
    getEmployeeSaleItem,
    editEmployeeSalesItem,
    deletetEmployeeSaleItem,
    getEmployeeSubstitutionOptions,
    addEmployeeAppartmentBonus,
    getEmployeeAppartmentBonus,
    deleteSubstitutionOption,
    editEmployeeSubstitutionOptions,
    addEmployeeSalesCode,
    getEmployeeSalesCode,
    getEmployeeSalesCodes,
};
