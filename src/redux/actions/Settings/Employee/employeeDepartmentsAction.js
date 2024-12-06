import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { showToast } from '../../toastAction';

//Departments Assigned to Employees
const getEmployeeDepartments = (employee, setLoading, returnData) => async (dispatch) => {
    const res = await api('get', EndPoints.EMPLOYEE_DEPARTMENTS, '', { employee });
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};
const addEmployeeDepartment = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', EndPoints.EMPLOYEE_DEPARTMENTS, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
const editEmployeeDepartment = (id, data, setLoading, next) => async (dispatch) => {
    setLoading(true);
    const res = await api('put', EndPoints.EMPLOYEE_DEPARTMENTS + id, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const deleteEmployeeDepartment = (id, next) => async (dispatch) => {
    const res = await api('delete', EndPoints.EMPLOYEE_DEPARTMENTS + id);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { getEmployeeDepartments, addEmployeeDepartment, editEmployeeDepartment, deleteEmployeeDepartment };
