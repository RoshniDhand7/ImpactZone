import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';

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
const addAvailability = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    const res = await api('put', endPoints.EMPLOYEE_AVAILABILITY, data);
    if (res.success) {
        next();
    }
    dispatch(hideLoaderAction());
};
export { getClubFromEmployee, addAvailability };
