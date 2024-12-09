import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { showToast } from '../../toastAction';

const getEmployeeDepartments = (employee, setLoading, returnData) => async () => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.SETTINGS.MANAGE_EMPLOYEE.DEPARTMENT, '', { employee });
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
const addEmployeeDepartment = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', EndPoints.SETTINGS.MANAGE_EMPLOYEE.DEPARTMENT, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
const editEmployeeDepartment = (id, data, setLoading, next) => async (dispatch) => {
    setLoading(true);
    const res = await api('put', EndPoints.SETTINGS.MANAGE_EMPLOYEE.DEPARTMENT + id, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const deleteEmployeeDepartment = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.MANAGE_EMPLOYEE.DEPARTMENT + id);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { getEmployeeDepartments, addEmployeeDepartment, editEmployeeDepartment, deleteEmployeeDepartment };
