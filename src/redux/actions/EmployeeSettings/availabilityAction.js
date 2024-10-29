import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';

const getAllAvailability = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', endPoints.EMPLOYEE_AVAILABILITY);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_EMPLOYEE_AVAILABILITY,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getClubFromEmployee = (id) => async (dispatch) => {
    const res = await api('get', endPoints.EMPLOYEE_CLUBS + id, {});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_EMPLOYEE_CLUBS,
                payload: res.data,
            });
        }
    }
};
const getAvailability = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', endPoints.EMPLOYEE_AVAILABILITY + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const addAvailability = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('put', endPoints.EMPLOYEE_AVAILABILITY, data);
    if (res.success) {
        next();
    }
    dispatch(hideLoaderAction());
};
export { getClubFromEmployee, addAvailability, getAllAvailability, getAvailability };
