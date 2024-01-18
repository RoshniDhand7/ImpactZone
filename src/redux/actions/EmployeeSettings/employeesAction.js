import moment from 'moment/moment';
import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getEmployees = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.EMPLOYEE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_EMPLOYEES,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};
const addEmployees = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);
    const payload = {
        ...data,
        dob: moment(data.dob).format('MM/DD/YYYY'),
    };

    const res = await api('post', EndPoints.EMPLOYEE, payload);
    if (res.success) {
        history.replace(`/settings/employee/manage-employee/edit/${res.data._id}`);
        dispatch(showToast({ severity: 'success', summary: res.message }));
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
    }
    dispatch(hideLoaderAction());
};
const editEmployee = (id, data, setLoading, history) => async (dispatch) => {
    setLoading(true);
    const payload = {
        ...data,
        ...(data?.dob && { dob: moment(data.dob).format('MM/DD/YYYY') }),
    };
    const res = await api('put', EndPoints.EMPLOYEE + id, payload);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
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
export { getEmployees, addEmployees, editEmployee, deleteEmployee, getEmployee };
