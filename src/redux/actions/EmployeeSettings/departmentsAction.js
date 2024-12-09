import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getDepartments = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.DEPARTMENTS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_DEPARTMENTS,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getDepartment = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.DEPARTMENTS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addDepartment = (data, setLoading, history) => async () => {
    setLoading(true);

    const res = await api('post', EndPoints.DEPARTMENTS, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editDepartment = (id, data, setLoading, history) => async () => {
    setLoading(true);

    const res = await api('put', EndPoints.DEPARTMENTS + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteDepartment = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.DEPARTMENTS + id);
    if (res.success) {
        dispatch(getDepartments(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getDepartments, addDepartment, getDepartment, editDepartment, deleteDepartment };
